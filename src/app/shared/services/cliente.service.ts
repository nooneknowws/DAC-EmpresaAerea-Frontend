import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Observable, catchError, map, switchMap, tap } from 'rxjs';
import { Cliente } from '../models/cliente/cliente';
import { Milhas } from '../models/cliente/milhas';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl: string = `${AppComponent.PUBLIC_BACKEND_URL}/clientes`;

  constructor(private http: HttpClient) {}

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`, httpOptions).pipe(
      catchError(this.handleError<Cliente>('getClienteById'))
    );
  }

  atualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente, httpOptions).pipe(
      catchError(error => {
        console.error('Erro ao atualizar cliente:', error);
        throw error;
      })
    );
  }  

  atualizarMilhas(clienteId: number, quantidadeMilhas: number): Observable<Cliente> {
    return this.getClienteById(clienteId).pipe(
      map(cliente => {
        cliente.saldoMilhas = (cliente.saldoMilhas || 0) + quantidadeMilhas;
        return cliente;
      }),
      switchMap(clienteAtualizado => this.http.put<Cliente>(`${this.apiUrl}/${clienteId}`, clienteAtualizado, httpOptions)),
      tap(clienteAtualizado => { window.sessionStorage.setItem('user', JSON.stringify(clienteAtualizado)); }),
      catchError(this.handleError<Cliente>('atualizarMilhas'))
    );
  }

  registrarTransacao(clienteId: number, valorEmReais: number, tipo: 'entrada' | 'saida', descricao: string): Observable<Cliente> {
    const quantidadeMilhas = tipo === 'entrada' ? valorEmReais / 5 : -(valorEmReais / 5);
    const novaTransacao = new Milhas(
      undefined,
      new Date().toISOString(),
      quantidadeMilhas,
      tipo,
      descricao
    );
  
    return this.getClienteById(clienteId).pipe(
      map(cliente => {
        if (!cliente.milhas) {
          cliente.milhas = [];
        }
        cliente.milhas.push(novaTransacao);  
        cliente.saldoMilhas = (cliente.saldoMilhas || 0) + quantidadeMilhas;
        return cliente;
      }),
      switchMap(clienteAtualizado => this.http.put<Cliente>(`${this.apiUrl}/${clienteId}`, clienteAtualizado, httpOptions)),
      tap(clienteAtualizado => { window.sessionStorage.setItem('user', JSON.stringify(clienteAtualizado)); }),
      catchError(this.handleError<Cliente>('registrarTransacao'))
    );
  }  

  listarTransacoes(clienteId: number): Observable<Milhas[]> {
    return this.getClienteById(clienteId).pipe(
      map(cliente => cliente.milhas || []),  
      catchError(this.handleError<Milhas[]>('listarTransacoes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return new Observable<T>(subscriber => subscriber.next(result as T));
    };
  }
}
