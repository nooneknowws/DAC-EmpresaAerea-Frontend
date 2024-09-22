import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { NgForm } from '@angular/forms';
import { CadastroService } from '../services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  @ViewChild('formCadastro') formCadastro!: NgForm;


  cliente: any = { endereco: {
    cep: null,
    rua: null,
    bairro: null,
    cidade: null,
    estado: null

  } };

  constructor(
    private cadastroService: CadastroService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.cliente = new Usuario ();
  }
  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) {
      throw new Error('CPF deve ter 11 dígitos.');
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    let digit1 = remainder >= 10 ? 0 : remainder;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    let digit2 = remainder >= 10 ? 0 : remainder;

    if (!(digit1 === parseInt(cpf.charAt(9)) && digit2 === parseInt(cpf.charAt(10)))) {
      throw new Error('CPF inválido.');
    }
    return true;
  }


  sucessoCadastro: boolean = false;
  erroCadastro: boolean = false;

  cadastrarCliente(): void {
    this.cliente.perfil = "CLIENTE";

    this.cadastroService.inserirCliente(this.cliente).subscribe(
      (response) => {
        console.log('cliente inserido com sucesso', response);
        this.sucessoCadastro = true;
        this.erroCadastro = false;
        this.cliente = { endereco: {} };
        this.formCadastro.resetForm();
      },
      (error) => {
        console.log('erro!', error);
        this.sucessoCadastro = false;
        this.erroCadastro = true;
      }
    );
  }

  verificarSenhasIguais(): boolean {
    const senhasIguais = this.cliente.senha === this.cliente.confirmacao;
    return senhasIguais;
  }

  verificaValidTouched(campo: { valid: any; touched: any }) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErrocpf(cpf: string) {
    try {
      this.validarCPF(cpf);
      return 'is-valid';
    } catch (error) {
      return 'is-invalid';
    }
  }

  aplicaCssErro(campo: any) {
    const hasError = this.verificaValidTouched(campo) && !campo.valid;
    return {
      'has-error': hasError,
    };
  }

  consultaCEP(cep: any, form: NgForm): void {
    console.log('Consulta CEP called with:', cep);
    cep = cep.replace(/\D/g, '');

    if (!this.cliente) {
      this.cliente = {};
    }

    if (!this.cliente.endereco) {
      this.cliente.endereco = {};
    }

    if (cep !== '') {
      let validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        this.http
          .get('https://viacep.com.br/ws/' + cep + '/json')
          .subscribe({
            next: (dados: any) => {
              this.cliente.endereco.cep = dados.cep;
              this.populaDadosForm(dados, form);
            },
            error: (error) => {
              console.error('Error while fetching address data:', error);
            },
          });
      }
    }
  }

populaDadosForm(dados: any, form: NgForm): void {
  console.log(dados);
  console.log(form.form);

  if (form && form.form && form.form.controls) {
    const { controls } = form.form;
    if (controls['rua']) controls['rua'].setValue(dados.logradouro);
    if (controls['bairro']) controls['bairro'].setValue(dados.bairro);
    if (controls['cidade']) controls['cidade'].setValue(dados.localidade);
    if (controls['uf']) controls['uf'].setValue(dados.uf);
  }
}
}
