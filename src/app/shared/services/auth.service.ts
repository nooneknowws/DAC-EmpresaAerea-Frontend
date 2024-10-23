import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AppComponent } from '../../app.component';
import { Cliente } from '../models/cliente/cliente';
import { Usuario } from '../models/usuario/usuario';
import { Funcionario } from '../models/funcionario';
import { Autenticacao } from '../models/autenticacao';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | undefined = undefined;
  private apiUrl: string = AppComponent.PUBLIC_BACKEND_URL;

  constructor(private http: HttpClient, private router: Router) { }

  private setAuthData(token: string, user: Usuario): void {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  private getAuthData(): { token: string | null, user: Usuario | null } {
    const token = localStorage.getItem('auth-token');
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) as Usuario : null;
    return { token, user };
  }

  login(email: string, senha: string): Observable<Cliente | Funcionario | null> {
    const buscarUsuario = (url: string): Observable<Cliente | Funcionario | null> =>
      this.http.get<Usuario[]>(url, httpOptions).pipe(
        map((usuarios: Usuario[]) => {
          const usuario = usuarios.find(u => u.email === email && u.senha === senha);
          if (usuario) {
            if ('milhas' in usuario) {
              return Object.assign(new Cliente(), usuario);
            }
            if ('ativo' in usuario && !('milhas' in usuario)) {
              return Object.assign(new Funcionario(), usuario);
            }
          }
          return null;
        })
      );

    return buscarUsuario(`${this.apiUrl}/clientes`).pipe(
      switchMap(cliente => {
        if (cliente) {
          return new Observable<Cliente | Funcionario | null>(observer => {
            observer.next(cliente);
            observer.complete();
          });
        } else {
          return buscarUsuario(`${this.apiUrl}/funcionarios`);
        }
      }),
      tap(usuario => {
        if (usuario) {
          const token = `fake-token-${usuario instanceof Cliente ? 'cliente' : 'funcionario'}`;
          this.setAuthData(token, usuario);
          if (usuario instanceof Cliente) {
            this.router.navigate(['/cliente']);
          } else if (usuario instanceof Funcionario) {
            this.router.navigate(['/funcionario']);
          }
        }
      })
    );
  }

  registerCliente (cliente: Cliente): Observable<Autenticacao> {
    return this.http.post<Autenticacao>(`${this.apiUrl}/clientes`, cliente, httpOptions).pipe(
      tap(response => this.setAuthData(response.token!, response.user!))
    );
  }

  registerFuncionario(funcionario: Funcionario): Observable<Autenticacao> {
    return this.http.post<Autenticacao>(`${this.apiUrl}/funcionarios`, funcionario, httpOptions).pipe(
      tap(response => this.setAuthData(response.token!, response.user!))
    );
  }

  logout(): void {
    localStorage.clear();
    this.token = undefined;
  }

  getToken(): string | undefined {
    if (!this.token) {
      this.token = this.getAuthData().token!;
    }
    return this.token;
  }

  getUser(): Usuario | null {
    return this.getAuthData().user;
  }

  getUserRole(): string {
    const currentUser = this.getUser();
    if (currentUser && 'milhas' in currentUser) {
      return 'cliente';
    } else return 'funcionario';
  }


  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && token !== undefined;
  }

  gerarSenha(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}
