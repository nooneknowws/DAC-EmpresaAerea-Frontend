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
  errorMessage = '';
  estados = Object.values(EstadosBrasil);
  cepInvalido = false;
  erroTimeout = false;
  cpfInvalido = false;
  isLoadingCep = false;
  isLoadingSubmit = false;

  constructor(private authService: AuthService, private http: HttpClient) { }

  buscarCep(): void {
    const cep = this.form.endereco.cep.toString().replace(/\D/g, '');
   
    if (cep.length === 8) {
      this.isLoadingCep = true;  
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).pipe(
        timeout(5000),
        catchError(error => {
          this.isLoadingCep = false;  
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
        this.isLoadingCep = false; 
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

  handleError(error: HttpErrorResponse): string {
    if (error.status === 400) {
      if (error.error.message.includes('CPF')) {
        return 'CPF já cadastrado no sistema';
      }
      if (error.error.message.includes('email')) {
        return 'Email já cadastrado no sistema';
      }
      return error.error.message;
    }
    if (error.status === 504) {
      return 'Serviço temporariamente indisponível. Tente novamente mais tarde.';
    }
    if (error.status === 0) {
      return 'Não foi possível conectar ao servidor. Verifique sua conexão.';
    }
    return 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (!this.authService.validarCPF(this.form.cpf)) {
        this.cpfInvalido = true;
        this.errorMessage = 'CPF inválido';
        this.isRegistrationFailed = true;
        return;
      }

      this.isLoadingSubmit = true;
      const { nome, cpf, email, telefone, endereco } = this.form;
      const password = this.authService.gerarSenha();
      const perfil = "Cliente";
      const cliente = new Cliente(telefone, 0);
      cliente.nome = nome;
      cliente.cpf = cpf.toString().replace(/[^\d]/g, ''); 
      cliente.email = email;
      cliente.senha = password;
      cliente.endereco = endereco;
      cliente.perfil = perfil;
      cliente.milhas = [];
     
      this.authService.registerCliente(cliente).subscribe({
        next: (data: Autenticacao) => {
          this.isLoadingSubmit = false;  
          this.isRegistered = true;
          this.isRegistrationFailed = false;
          this.cpfInvalido = false;
          form.reset();
        },
        error: (err: HttpErrorResponse) => {
          this.isLoadingSubmit = false;  
          this.errorMessage = this.handleError(err);
          this.isRegistrationFailed = true;
          this.isRegistered = false;
        }
      });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios corretamente.';
      this.isRegistrationFailed = true;
    }
  }
}