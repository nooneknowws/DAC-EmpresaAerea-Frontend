import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    return this.http.get<Reserva[]>(`${this.apiUrl}/reservas`);
  }

  getAeroportos(): Observable<Aeroporto[]>{
    return this.http.get<Aeroporto[]>(`${this.apiUrl}/api/aeroportos`, this.getHttpOptions());
  }

  getVoosFiltrados(aeroportoOrigem: Aeroporto, aeroportoDestino: Aeroporto): Observable<Voo[]> {
    const params = new HttpParams()
        .set('origem', aeroportoOrigem.codigo!)
        .set('destino', aeroportoDestino.codigo!);

    return this.http.get<Voo[]>(`${this.apiUrl}/voos/filter`, {
        headers: this.getHttpOptions().headers,
        params: params
    });
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
