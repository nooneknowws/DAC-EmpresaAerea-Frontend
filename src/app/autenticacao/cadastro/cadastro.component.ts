import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { Autenticacao } from '../../shared/models/autenticacao';
import { Endereco } from '../../shared/models/endereco.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  form: any = {
    nome: null,
    cpf: null,
    email: null,
    password: null,
    endereco: new Endereco('', '', '', '', '', '', '')
  };

  isRegistered = false;
  isRegistrationFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private http: HttpClient) { }

  buscarCep(): void {
    const cep = this.form.endereco.cep.toString().replace(/\D/g, '');
    if (cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
        next: (data: any) => {
          if (!data.erro) {
            this.form.endereco.logradouro = data.logradouro;
            this.form.endereco.bairro = data.bairro;
            this.form.endereco.cidade = data.localidade;
            this.form.endereco.estado = data.uf;
          } else {
            this.errorMessage = 'CEP não encontrado';
          }
        },
        error: () => {
          this.errorMessage = 'Erro ao buscar o CEP';
        }
      });
    } else {
      this.errorMessage = 'CEP inválido';
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { nome, cpf, email, password, endereco } = this.form;
      this.authService.register(nome, cpf, email, password, endereco).subscribe({
        next: (data: Autenticacao) => {
          this.isRegistered = true;
          this.isRegistrationFailed = false;
          form.reset();
        },
        error: err => {
          this.errorMessage = err.error.message || 'Erro ao registrar';
          this.isRegistrationFailed = true;
        }
      });
    }
  }
}
