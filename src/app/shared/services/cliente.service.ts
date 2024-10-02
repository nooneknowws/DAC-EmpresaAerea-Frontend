import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../models/reserva/reserva.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private BASE_URL = 'http://localhost:3000/reservas';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  cancelar(reserva: Reserva): Observable<void> {
    reserva.status = 'Cancelado'
    return this.httpClient.put<void>(`${this.BASE_URL}/${reserva.id}`, reserva, this.httpOptions);
  }

  buscarPorId(id: string): Observable<Reserva> {
    return this.httpClient.get<Reserva>(`${this.BASE_URL}/${id}`);
  }
  listarTodos(): Observable<Reserva[]> {
    return this.httpClient.get<Reserva[]>(this.BASE_URL);
  }
}
