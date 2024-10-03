import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../models/reserva/reserva.model';
import { Observable } from 'rxjs';
import { AppComponent } from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl: string = AppComponent.PUBLIC_BACKEND_URL;
  constructor(private http: HttpClient) {}

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/reservas`);
  }

  getReservaById(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/reservas/` + id);
  }

  cancelar(reserva: Reserva): Observable<Reserva> {
    reserva.status = 'Cancelado'
    return this.http.put<Reserva>(`${this.apiUrl}/reservas/${reserva.id}`, reserva);
  }
}
