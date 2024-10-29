import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../models/reserva/reserva';
import { Observable } from 'rxjs';
import { StatusReservaEnum } from '../models/reserva/status-reserva.enum';
import { Aeroporto } from '../models/voo/aeroporto';
import { Voo } from '../models/voo/voo';

@Injectable({
  providedIn: 'root'
})

export class ReservaService {

  private apiUrl: string = AppComponent.PUBLIC_BACKEND_URL;
  constructor(private http: HttpClient) {}

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/reservas`);
  }

  getAeroportos(): Observable<Aeroporto[]>{
    return this.http.get<Aeroporto[]>(`${this.apiUrl}/aeroportos`);
  }

  getVoosFiltrados(aeroportoOrigem: Aeroporto, aeroportoDestino: Aeroporto) {
    return this.http.get<Voo[]>(`${this.apiUrl}/voos`);
  }

  getReservaById(id: string): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/reservas/` + id);
  }

  efetuar(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.apiUrl}/reservas`, reserva);
  }

  cancelar(reserva: Reserva): Observable<Reserva> {
    reserva.dataHora = new Date().toISOString();
    reserva.status = StatusReservaEnum.CANCELADO;
    return this.http.put<Reserva>(`${this.apiUrl}/reservas/${reserva.id}`, reserva);
  }

  confirmarEmbarque(reserva: Reserva): Observable<Reserva> {
    reserva.status = StatusReservaEnum.EMBARCADO;
    return this.http.put<Reserva>(`${this.apiUrl}/reservas/${reserva.id}`, reserva);
  }
}
