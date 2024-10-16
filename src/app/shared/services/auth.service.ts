import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppComponent } from '../../app.component';
import { Autenticacao } from '../models/autenticacao/autenticacao';
import { Cliente } from '../models/cliente/cliente';
import { Usuario } from '../models/usuario/usuario.model';
import { Funcionario } from '../models/funcionario/funcionario';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | undefined = undefined;
  private apiUrl: string = AppComponent.PUBLIC_BACKEND_URL;

  constructor(private http: HttpClient) { }

  /* Login de verdade
  login(usuario: Usuario): Observable<Autenticacao> {
    return this.http.post<Autenticacao>(`${this.apiUrl}/login`, Usuario, httpOptions).pipe(
      tap(response => {
        this.token = response.token;
        window.sessionStorage.setItem('auth-token', this.token!);
        window.sessionStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }
  */

  login(email: string, senha: string): Observable<Cliente | Funcionario | null> {
    const buscarUsuario = (url: string) => this.http.get<any[]>(url, httpOptions).pipe(
      map(usuarios => usuarios.find(usuario => usuario.email === email && usuario.senha === senha)),
      tap(usuario => usuario && this.simularLogin(`fake-token-${url.split('/').pop()}`, usuario))
    );

    return buscarUsuario(`${this.apiUrl}/clientes`).pipe(
      catchError(() => buscarUsuario(`${this.apiUrl}/funcionarios`))
    );
  }

  private simularLogin(token: string, user: Cliente | Funcionario): void {
    window.sessionStorage.setItem('auth-token', token);
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }

  register(cliente: Cliente): Observable<Autenticacao> {
    return this.http.post<Autenticacao>(`${this.apiUrl}/clientes`, cliente, httpOptions).pipe(
      tap(response => {
        this.token = response.token;
        window.sessionStorage.setItem('auth-token', this.token!);
        window.sessionStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  logout(): void {
    window.sessionStorage.clear();
    this.token = undefined;
  }

  getToken(): string | undefined {
    if (!this.token) {
      this.token = window.sessionStorage.getItem('auth-token')!;
    }
    return this.token;
  }

  getUser(): Cliente | Funcionario | null {
    const user = window.sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

 gerarSenha(): string {
    const senha = Math.floor(1000 + Math.random() * 9000);
    return senha.toString();
  }
}
