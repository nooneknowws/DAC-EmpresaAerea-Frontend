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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = AppComponent.PUBLIC_BACKEND_URL;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser = this.currentUserSubject.asObservable();
  private token: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initializeServiceState();
  }

  private getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem(this.TOKEN_KEY) || '';
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
  }

  setUser(user: Usuario): void {
    this.currentUserSubject.next(user);
  }
  getUser(): Usuario | null {
    return this.currentUserSubject.value;
  }
  
  private initializeServiceState(): void {
    try {
      const storedToken = localStorage.getItem(this.TOKEN_KEY);
      const storedUser = localStorage.getItem(this.USER_KEY);

      if ((!storedToken && storedUser) || (storedToken && !storedUser)) {
        this.clearSession();
      } else if (storedToken && storedUser) {
        this.token = storedToken;
        const parsedUser = JSON.parse(storedUser);
        this.currentUserSubject.next(parsedUser);
      }
    } catch (error) {
      this.clearSession();
    }
  }

  login(email: string, senha: string): Observable<Cliente | Funcionario | null> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }, this.getHttpOptions()).pipe(
      map(response => {
        if (response.status === 'success' && response.token) {
          const user = response.perfil === 'Cliente' ? new Cliente() : new Funcionario();
          user.id = response.id;
          user.email = response.email;
          user.perfil = response.perfil;
          this.setSessionData(response.token, user);
          return user;
        }
        return null;
      }),
      catchError(error => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  private setSessionData(token: string, user: Usuario): void {
    this.token = token;
    localStorage.setItem(this.TOKEN_KEY, token);
    this.currentUserSubject.next(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return !!this.token && !!this.currentUserSubject.value;
  }

  logout(): Observable<any> {
    console.log('Logging out');

    if (!this.token) {
      this.clearSession();
      return of(null);
    }

    return this.http.post(`${this.apiUrl}/logout`, {}, this.getHttpOptions()).pipe(
      tap(() => this.clearSession()),
      catchError(error => {
        console.error('Logout error:', error);
        this.clearSession();
        return of(null);
      })
    );
  }

  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }
  
  private clearSession(): void {
    console.log('Clearing session');

    this.token = null;
    this.currentUserSubject.next(null);
    localStorage.clear();

    console.log('Session cleared successfully');
  }

  getToken(): string | null {
    return this.token;
  }

  getCliente(id: string | undefined): Observable<Cliente> {
    const idNumber = id ? Number(id) : NaN;
    if (isNaN(idNumber)) {
      throw new Error('Invalid ID');
    }

    return this.http.get<Cliente>(`${this.apiUrl}/clientes/busca/${idNumber}`, this.getHttpOptions());
  }

  getFuncionario(id: string | undefined): Observable<Funcionario> {
    const idNumber = id ? Number(id) : NaN;
    if(isNaN(idNumber)) {
      throw new Error('Invalid ID');
    }

    return this.http.get<Funcionario>(`${this.apiUrl}/funcionarios/${idNumber}`, this.getHttpOptions());
  }


  getUserRole(): string {
    const currentUser = this.currentUserSubject.value;
    return currentUser && 'milhas' in currentUser ? 'cliente' : 'funcionario';
  }

  gerarSenha(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

   registerCliente(cliente: Cliente): Observable<Autenticacao> {
    return this.http.post<Autenticacao>(`${this.apiUrl}/clientes/cadastro`, cliente, this.getHttpOptions());
  }

  registerFuncionario(funcionario: Funcionario): Observable<Autenticacao> {
    funcionario.funcStatus = 'ATIVO';
    funcionario.perfil = 'Funcionario';
    return this.http.post<Autenticacao>(`${this.apiUrl}/funcionarios/cadastro`, funcionario, this.getHttpOptions());
  }
}
