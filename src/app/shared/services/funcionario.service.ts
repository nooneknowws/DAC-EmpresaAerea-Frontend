import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AppComponent } from '../../app.component';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private apiUrl: string = `${AppComponent.PUBLIC_BACKEND_URL}/funcionarios`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) {}

  listarTodos(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.apiUrl);
  }

  inserir(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>(this.apiUrl, funcionario, this.httpOptions);
  }

  alterar(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.put<Funcionario>(`${this.apiUrl}/${funcionario.id}`, funcionario, this.httpOptions);
  }

  desativarFuncionario(id: number | undefined): Observable<Funcionario> {
    return this.buscarPorId(id!.toString()).pipe(
      switchMap((funcionario: Funcionario) => {
        funcionario.matricula = "0";
        return this.alterar(funcionario);
      })
    );
  }

  remover(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  buscarPorId(id: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(`${this.apiUrl}/${id}`);
  }
}
