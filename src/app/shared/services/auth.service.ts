import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppComponent } from '../../app.component';
import { Usuario } from '../models/usuario.model';
import { Autenticacao } from '../models/autenticacao';
import { Endereco } from '../models/endereco.model';

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

  login(email: string, senha: string): Observable<Autenticacao> {
    return this.http.post<Autenticacao>(`${this.apiUrl}/login`, { email, senha }, httpOptions).pipe(
      tap(response => {
        this.token = response.token;
        window.sessionStorage.setItem('auth-token', this.token!); 
        window.sessionStorage.setItem('user', JSON.stringify(response.user)); 
      })
    );
  }

  register(nome: string, cpf: string, email: string, senha: string, endereco: Endereco): Observable<Autenticacao> {
    return this.http.post<Autenticacao>(`${this.apiUrl}/register`, { nome, cpf, email, senha, endereco }, httpOptions).pipe(
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

  getUser(): Usuario | null {
    const user = window.sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
