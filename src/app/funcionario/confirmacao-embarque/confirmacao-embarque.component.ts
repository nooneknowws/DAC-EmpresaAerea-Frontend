import { Component } from '@angular/core';
// import { Funcionario } from '../../shared/models/funcionario/funcionario';
import { Cliente } from '../../shared/models/cliente/cliente';

@Component({
  selector: 'app-confirmacao-embarque',
  templateUrl: './confirmacao-embarque.component.html',
  styleUrls: ['./confirmacao-embarque.component.css']
})
export class ConfirmacaoEmbarqueComponent {
  //TODO: Usar lógica para funcionário. Usando cliente apenas para testar.
  // user: Funcionario | null = null;
  user: Cliente | null = null;
}
