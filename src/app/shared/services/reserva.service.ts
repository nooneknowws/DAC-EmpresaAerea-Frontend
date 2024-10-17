import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../models/reserva/reserva';
import { Observable } from 'rxjs';
import { StatusReservaEnum } from '../models/reserva/status-reserva.enum';

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
    reserva.status = StatusReservaEnum.CANCELADO;
    return this.http.put<Reserva>(`${this.apiUrl}/reservas/${reserva.id}`, reserva);
  }
}
