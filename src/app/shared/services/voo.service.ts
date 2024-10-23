import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voo } from '../models/voo/voo';

@Injectable({
  providedIn: 'root'
})
export class VooService {
  private apiUrl: string = AppComponent.PUBLIC_BACKEND_URL;
  constructor(private http: HttpClient) {}

  getVoos(): Observable<Voo[]> {
    return this.http.get<Voo[]>(`${this.apiUrl}/voos`);
  }

  getVooById(id: number): Observable<Voo> {
    return this.http.get<Voo>(`${this.apiUrl}/voos/` + id);
  }

  confirmarEmbarque(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/voos/${id}`, { status: 'Embarcado' });
  }

  cancelarVoo(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/voos/${id}`, { status: 'Cancelado' });
  }

  realizarVoo(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/voos/${id}`, { status: 'Realizado' });
  }

  cadastrarVoo(voo: Voo): Observable<any> {
    return this.http.post(`${this.apiUrl}/voos`, {
      ...voo, status: 'Confirmado'  
    });
  }
}

