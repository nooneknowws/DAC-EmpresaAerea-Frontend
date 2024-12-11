import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Reserva } from '../models/reserva/reserva';
import { Observable, tap } from 'rxjs';
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

  getVoosFiltrados(aeroportoOrigem: Aeroporto, aeroportoDestino: Aeroporto): Observable<Voo[]> {
    const params = new HttpParams()
        .set('origem', aeroportoOrigem.codigo!)
        .set('destino', aeroportoDestino.codigo!);

    return this.http.get<Voo[]>(`${this.apiUrl}/voos/filter`, {
        headers: this.getHttpOptions().headers,
        params: params
    });
}
getReservasByClienteId(clienteId: string): Observable<ReservaDTO[]> {
  console.log('Calling API for clientId:', clienteId);
  const url = `${this.apiUrl}/reservas/cliente/${clienteId}`;
  console.log('Request URL:', url);
  
  return this.http.get<ReservaDTO[]>(url, this.getHttpOptions()).pipe(
    tap({
      next: (response) => console.log('Raw API Response:', response),
      error: (error) => console.error('API Error:', error)
    })
  );
}
  getReservaByCod(id: string): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/reservas/` + id, this.getHttpOptions());
  }
  getReservaById(id: string): Observable<ReservaDTO> {
    const url = `${this.apiUrl}/reservas/${id}`;
    console.log('Fetching reserva details for ID:', id);
    
    return this.http.get<ReservaDTO>(url, this.getHttpOptions()).pipe(
      tap({
        next: (response) => console.log('Reserva details received:', response),
        error: (error) => console.error('Error fetching reserva details:', error)
      })
    );
  }

  efetuar(reservaDTO: ReservaDTO): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.apiUrl}/reservas`, reservaDTO, this.getHttpOptions());
  }

  confirmarReserva(id: number): Observable<ReservaDTO> {
    const url = `${this.apiUrl}/reservas/${id}/confirmar`;
    console.log('Confirming reservation with ID:', id);
    
    return this.http.put<ReservaDTO>(url, {}, this.getHttpOptions()).pipe(
      tap({
        next: (response) => console.log('Reservation confirmation response:', response),
        error: (error) => console.error('Error confirming reservation:', error)
      })
    );
  }

  cancelarReserva(id: number): Observable<ReservaDTO> {
    const url = `${this.apiUrl}/reservas/${id}/cancelar`;
    console.log('Canceling reservation with ID:', id);
    
    return this.http.put<ReservaDTO>(url, {}, this.getHttpOptions()).pipe(
      tap({
        next: (response) => console.log('Reservation cancellation response:', response),
        error: (error) => console.error('Error canceling reservation:', error)
      })
    );
  }

  confirmarEmbarque(reserva: Reserva): Observable<Reserva> {
    reserva.status = StatusReservaEnum.EMBARCADO;
    return this.http.put<Reserva>(`${this.apiUrl}/reservas/${reserva.id}`, reserva, this.getHttpOptions());
  }
}