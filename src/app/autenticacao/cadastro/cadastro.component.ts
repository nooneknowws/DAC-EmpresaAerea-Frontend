import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../shared/models/cliente/cliente';
import { Endereco } from '../../shared/models/usuario/endereco';
import { EstadosBrasil } from '../../shared/models/voo/estados-brasil';
import { Autenticacao } from '../../shared/models/autenticacao';

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
    endereco: new Endereco('', '', '', '', '', '', '')
  };

  isRegistered = false;
  isRegistrationFailed = false;
  errorMessage = '';
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
      const { nome, cpf, email, telefone, endereco } = this.form;
      const password = this.authService.gerarSenha();
      const perfil = "Cliente"
      console.log(password);

      const cliente = new Cliente(telefone, { quantidade: 0 });
      cliente.nome = nome;
      cliente.cpf = cpf.toString();
      cliente.email = email;
      cliente.senha = password;
      cliente.endereco = endereco;
      cliente.perfil = perfil;

      this.authService.registerCliente(cliente).subscribe({
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
