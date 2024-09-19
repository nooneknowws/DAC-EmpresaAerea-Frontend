import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../shared/models/cliente'; 
import { NgForm } from '@angular/forms';

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
  ) {}

  ngOnInit(): void {
    this.cliente = new Cliente ();
  }


}