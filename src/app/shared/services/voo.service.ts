import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { HttpClient } from '@angular/common/http';
import { Voo } from '../models/voos/voo.model';
import { Observable } from 'rxjs';

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
    return this.http.get<Voo>(`${this.apiUrl}/reservas/` + id);
  }
}

