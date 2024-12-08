import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reserva } from '../models/reserva/reserva';
import { Observable } from 'rxjs';
import { StatusReservaEnum } from '../models/reserva/status-reserva.enum';
import { Aeroporto } from '../models/voo/aeroporto';
import { Voo } from '../models/voo/voo';
import { ReservaDTO } from '../models/reserva/reservaDTO';

@Injectable({
  providedIn: 'root'
})

export class ReservaService {

  private apiUrl: string = AppComponent.PUBLIC_BACKEND_URL;
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

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/reservas`, this.getHttpOptions());
  }

  getAeroportos(): Observable<Aeroporto[]>{
    return this.http.get<Aeroporto[]>(`${this.apiUrl}/api/aeroportos`, this.getHttpOptions());
  }

  getVoosFiltrados(aeroportoOrigem: Aeroporto, aeroportoDestino: Aeroporto) {
    return this.http.get<Voo[]>(`${this.apiUrl}/voos`, this.getHttpOptions());
  }

  getReservaById(id: string): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/reservas/` + id, this.getHttpOptions());
  }

  efetuar(reservaDTO: ReservaDTO): Observable<ReservaDTO> {
    return this.http.post<ReservaDTO>(`${this.apiUrl}/reservas`, reservaDTO, this.getHttpOptions());
  }

  cancelar(reserva: Reserva): Observable<Reserva> {
    reserva.dataHora = new Date().toISOString();
    reserva.status = StatusReservaEnum.CANCELADO;
    return this.http.put<Reserva>(`${this.apiUrl}/reservas/${reserva.id}`, reserva, this.getHttpOptions());
  }

  confirmarEmbarque(reserva: Reserva): Observable<Reserva> {
    reserva.status = StatusReservaEnum.EMBARCADO;
    return this.http.put<Reserva>(`${this.apiUrl}/reservas/${reserva.id}`, reserva, this.getHttpOptions());
  }
}