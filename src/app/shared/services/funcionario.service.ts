import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../../shared/models/funcionario/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private BASE_URL = 'http://localhost:3000/funcionarios';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) {}

  listarTodos(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.BASE_URL);
  }

  inserir(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>(this.BASE_URL, funcionario, this.httpOptions);
  }

  alterar(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.put<Funcionario>(`${this.BASE_URL}/${funcionario.id}`, funcionario, this.httpOptions);
  }

  remover(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`, this.httpOptions);
  }

  buscarPorId(id: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(`${this.BASE_URL}/${id}`);
  }
}
