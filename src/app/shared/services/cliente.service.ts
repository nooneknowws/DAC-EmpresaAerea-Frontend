import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Observable, catchError, map, switchMap, tap } from 'rxjs';
import { Cliente } from '../models/cliente/cliente';
import { Milhas } from '../models/cliente/milhas';
import { MilhasDTO } from '../models/cliente/milhasDTO';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl: string = AppComponent.PUBLIC_BACKEND_URL;
  private readonly USER_KEY = 'user';

  constructor(private http: HttpClient) {}

  private getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('auth_token') || '';
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
  }

  getClienteById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/clientes/busca/${id}`, this.getHttpOptions()).pipe(
      catchError(error => {
        console.error('Error fetching cliente:', error);
        throw error;
      })
    );
  }

  processarTransacaoMilhas(valorEmReais: number, quantidade: number, tipo: 'ENTRADA' | 'SAIDA', clienteId: string, descricao: string): Observable<Milhas> {
    const milhasDTO = {
      clienteId: Number(clienteId), 
      quantidade: quantidade,
      entradaSaida: tipo,
      valorEmReais: valorEmReais,
      descricao: descricao
    };
  
    return this.http.post<Milhas>(
      `${this.apiUrl}/api/milhas`, 
      milhasDTO,
      this.getHttpOptions()
    ).pipe(
      catchError(error => {
        console.error('Error processing miles transaction:', error);
        throw error;
      })
    );
  }

  listarTransacoes(clienteId: string): Observable<Milhas[]> {
    return this.http.get<Milhas[]>(
      `${this.apiUrl}/api/milhas/${clienteId}`,
      this.getHttpOptions()
    ).pipe(
      catchError(error => {
        console.error('Error fetching transactions:', error);
        throw error;
      })
    );
  }
}