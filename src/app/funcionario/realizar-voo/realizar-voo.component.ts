import { Component } from '@angular/core';
//import { Funcionario } from '../../shared/models/funcionario/funcionario';
import { Cliente } from '../../shared/models/cliente/cliente';

@Component({
  selector: 'app-realizar-voo',
  templateUrl: './realizar-voo.component.html',
  styleUrls: ['./realizar-voo.component.css']
})
export class RealizarVooComponent {
  //TODO: Usar lógica para funcionário. Usando cliente apenas para testar.
  //user: Funcionario | null = null;
  user: Cliente | null = null;
  constructor() {}
}
