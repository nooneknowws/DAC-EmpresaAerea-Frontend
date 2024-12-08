import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Cliente } from '../../shared/models/cliente/cliente';
import { Endereco } from '../../shared/models/usuario/endereco';
import { EstadosBrasil } from '../../shared/models/voo/estados-brasil';
import { Autenticacao } from '../../shared/models/autenticacao';
import { catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs';

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
    telefone: null,
    endereco: new Endereco(0, '', '', '', '', '', '')
  };

  isRegistered = false;
  isRegistrationFailed = false;
  errorMessages: string[] = [];
  estados = Object.values(EstadosBrasil);
  cepInvalido = false;
  erroTimeout = false;

  constructor(private authService: AuthService, private http: HttpClient) { }

  buscarCep(): void {
    const cep = this.form.endereco.cep.toString().replace(/\D/g, '');
    
    if (cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).pipe(
        timeout(5000),
        catchError(error => {
          if (error.name === 'TimeoutError') {
            this.erroTimeout = true;
            this.cepInvalido = false;
          } else {
            this.cepInvalido = true; 
            this.erroTimeout = false;
          }
          return of(null);  
        })
      ).subscribe((data: any) => {
        if (data && !data.erro) {
          this.cepInvalido = false;
          this.erroTimeout = false;
          this.form.endereco.logradouro = data.logradouro;
          this.form.endereco.bairro = data.bairro;
          this.form.endereco.cidade = data.localidade;
          this.form.endereco.estado = data.uf;
        } else {
          this.cepInvalido = true;
        }
      });
    } else {
      this.cepInvalido = true;
    }
  }

  onSubmit(form: NgForm): void {
    this.errorMessages = []; // Clear previous errors
    this.isRegistrationFailed = false;

    if (form.valid) {
      const { nome, cpf, email, telefone, endereco } = this.form;
      const password = this.authService.gerarSenha();
      const perfil = "Cliente";
      const cliente = new Cliente(telefone, 0);
      cliente.nome = nome;
      cliente.cpf = cpf.toString();
      cliente.email = email;
      cliente.senha = password;
      cliente.endereco = endereco;
      cliente.perfil = perfil;
      cliente.milhas = [];
      
      this.authService.registerCliente(cliente).subscribe({
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
