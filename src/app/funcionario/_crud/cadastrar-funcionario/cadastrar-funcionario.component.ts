import { Component } from '@angular/core';
import { Endereco } from '../../../shared/models/usuario/endereco';
import { EstadosBrasil } from '../../../shared/models/voo/estados-brasil';
import { AuthService } from '../../../shared/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Funcionario } from '../../../shared/models/funcionario';
import { Autenticacao } from '../../../shared/models/autenticacao';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrl: './cadastrar-funcionario.component.css'
})
export class CadastrarFuncionarioComponent {
  form: any = {
    nome: null,
    cpf: null,
    email: null,
    password: null,
    telefone: null,
    endereco: new Endereco(0, '', '', '', '', '', '')
  };

  isRegistered = false;
  isRegistrationFailed = false;
  errorMessages: string[] = [];
  estados = Object.values(EstadosBrasil);

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
            this.errorMessages = ['CEP não encontrado'];
          }
        },
        error: () => {
          this.errorMessages = ['Erro ao buscar o CEP'];
        }
      });
    } else {
      this.errorMessages = ['CEP inválido'];
    }
  }

  onSubmit(form: NgForm): void {
    this.errorMessages = []; // Clear previous errors
    this.isRegistrationFailed = false;

    if (form.valid) {
      const { nome, cpf, email, telefone, endereco } = this.form;
      const password = this.authService.gerarSenha();

      const funcionario = new Funcionario(telefone);
      funcionario.nome = nome;
      funcionario.cpf = cpf.toString();
      funcionario.email = email;
      funcionario.senha = password;
      funcionario.endereco = endereco;
      funcionario.funcStatus = "ATIVO";

      this.authService.registerFuncionario(funcionario).subscribe({
        next: (data: Autenticacao) => {
          this.isRegistered = true;
          this.isRegistrationFailed = false;
          this.errorMessages = [];
          form.reset();
        },
        error: (err: HttpErrorResponse) => {
          this.isRegistrationFailed = true;
          
          if (err.status === 409 && err.error?.messages) {
            // Handle conflict errors (multiple messages)
            this.errorMessages = err.error.messages;
          } else if (err.status === 408) {
            // Handle timeout
            this.errorMessages = ['Tempo de requisição esgotado. Por favor, tente novamente.'];
          } else if (err.error?.message) {
            // Handle single error message
            this.errorMessages = [err.error.message];
          } else {
            // Handle unknown errors
            this.errorMessages = ['Erro ao realizar cadastro. Por favor, tente novamente.'];
          }
        }
      });
    }
  }
}