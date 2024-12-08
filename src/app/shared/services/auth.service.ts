import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Cliente } from '../models/cliente/cliente';
import { Usuario } from '../models/usuario/usuario';
import { Funcionario } from '../models/funcionario';
import { Autenticacao } from '../models/autenticacao';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = AppComponent.PUBLIC_BACKEND_URL;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';
  
  // Initialize BehaviorSubject immediately to prevent undefined errors
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser = this.currentUserSubject.asObservable();
  private token: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize service state after BehaviorSubject is created
    this.initializeServiceState();
  }

  // Separate initialization logic into its own method
  private initializeServiceState(): void {
    try {
      // First check storage consistency
      const storedToken = localStorage.getItem(this.TOKEN_KEY);
      const storedUser = localStorage.getItem(this.USER_KEY);

      console.log('Checking stored auth data:', {
        hasStoredToken: !!storedToken,
        hasStoredUser: !!storedUser
      });

      // Clear if data is inconsistent
      if ((!storedToken && storedUser) || (storedToken && !storedUser)) {
        console.log('Found inconsistent stored data, clearing session');
        this.token = null;
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        this.currentUserSubject.next(null);
      } 
      // Set both if we have valid data
      else if (storedToken && storedUser) {
        console.log('Found valid stored session data');
        this.token = storedToken;
        const parsedUser = JSON.parse(storedUser);
        this.currentUserSubject.next(parsedUser);
      }

      console.log('Service state initialized:', {
        hasToken: !!this.token,
        hasUser: !!this.currentUserSubject.value
      });
    } catch (error) {
      // Handle any initialization errors gracefully
      console.error('Error during service initialization:', error);
      this.token = null;
      localStorage.clear();
      this.currentUserSubject.next(null);
    }
  }

  login(email: string, senha: string): Observable<Cliente | Funcionario | null> {
    console.log('Attempting login for:', email);
    
    // Clear existing session before login attempt
    this.token = null;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);

    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }, httpOptions).pipe(
      tap(response => console.log('Login response:', response)),
      map(response => {
        if (response.status === 'success' && response.token) {
          console.log('Login successful, setting up session');
          
          let user: Cliente | Funcionario;
          if (response.perfil === 'Cliente') {
            user = new Cliente();
          } else {
            user = new Funcionario();
          }
          
          user.id = response.id;
          user.email = response.email;
          user.perfil = response.perfil;
          
          // Set session data
          this.token = response.token;
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.currentUserSubject.next(user);
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          
          return user;
        }
        console.log('Login response indicates failure');
        return null;
      }),
      catchError(error => {
        console.error('Login failed, trying legacy login:', error);
        return this.legacyLogin(email, senha);
      })
    );
  }

  private setSessionData(token: string, user: Usuario): void {
    console.log('Setting session data');
    
    this.token = token;
    localStorage.setItem(this.TOKEN_KEY, token);
    
    this.currentUserSubject.next(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    
    console.log('Session data set successfully:', {
      hasToken: !!this.token,
      hasUser: !!this.currentUserSubject.value
    });
  }

  private clearSession(): void {
    console.log('Clearing session');
    
    this.token = null;
    this.currentUserSubject.next(null);
    
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    console.log('Session cleared successfully');
  }

  isAuthenticated(): boolean {
    const hasToken = !!this.token;
    const hasUser = !!this.currentUserSubject.value;
    
    if (hasToken !== hasUser) {
      console.log('Detected mismatched authentication state, clearing session');
      this.clearSession();
      return false;
    }
    
    console.log('Checking authentication:', { hasToken, hasUser });
    return hasToken && hasUser;
  }

  logout(): Observable<any> {
    console.log('Logging out');
    
    if (!this.token) {
      this.clearSession();
      return of(null);
    }

    return this.http.post(`${this.apiUrl}/logout`, { token: this.token }).pipe(
      tap(() => this.clearSession()),
      catchError(error => {
        console.error('Logout error:', error);
        this.clearSession();
        return of(null);
      })
    );
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  getUserRole(): string {
    const currentUser = this.getUser();
    return currentUser && 'milhas' in currentUser ? 'cliente' : 'funcionario';
  }
  gerarSenha(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  registerCliente(cliente: Cliente): Observable<Autenticacao> {
    return this.http.post<Autenticacao>(`${this.apiUrl}/clientes/cadastro`, cliente, httpOptions).pipe(
      tap(response => {
        if (response.token && response.user) {
          this.token = response.token;
          this.currentUserSubject.next(response.user);
        }
      }),
      catchError(error => {
        console.error('Client registration failed:', error);
        throw error;
      })
    );
  }

  registerFuncionario(funcionario: Funcionario): Observable<Autenticacao> {
    funcionario.funcStatus = "ATIVO";
    funcionario.perfil = "Funcionario";
    return this.http.post<Autenticacao>(`${this.apiUrl}/funcionarios/cadastro`, funcionario, httpOptions).pipe(
      tap(response => {
        if (response.token && response.user) {
          this.token = response.token;
          this.currentUserSubject.next(response.user);
        }
      }),
      catchError(error => {
        console.error('Employee registration failed:', error);
        throw error;
      })
    );
  }
  private legacyLogin(email: string, senha: string): Observable<Cliente | Funcionario | null> {
    console.log('Attempting legacy login');
    const tempToken = `temp-token-${Date.now()}`;
    
    return this.http.get<Usuario[]>(`${this.apiUrl}/clientes`, httpOptions).pipe(
      tap(users => console.log('Checking clients:', users.length)),
      map(users => {
        const user = users.find(u => u.email === email && u.senha === senha);
        if (user) {
          console.log('Found matching client:', user.email);
          this.setSessionData(tempToken, user);
          return user as Cliente;
        }
        console.log('No matching client found');
        return null;
      }),
      catchError(error => {
        console.log('Client check failed, checking employees:', error);
        return this.http.get<Usuario[]>(`${this.apiUrl}/funcionarios`, httpOptions).pipe(
          map(users => {
            const user = users.find(u => u.email === email && u.senha === senha);
            if (user) {
              console.log('Found matching employee:', user.email);
              this.setSessionData(tempToken, user);
              return user as Funcionario;
            }
            console.log('No matching employee found');
            return null;
          })
        );
      })
    );
  }
}