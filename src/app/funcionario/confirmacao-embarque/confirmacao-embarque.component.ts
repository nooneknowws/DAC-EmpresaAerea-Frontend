import { Component, OnInit } from '@angular/core';
// import { Funcionario } from '../../shared/models/funcionario/funcionario';
import { Cliente } from '../../shared/models/cliente/cliente';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-confirmacao-embarque',
  templateUrl: './confirmacao-embarque.component.html',
  styleUrls: ['./confirmacao-embarque.component.css']
})
export class ConfirmacaoEmbarqueComponent implements OnInit{
  //TODO: Usar lógica para funcionário. Usando cliente apenas para testar.
  // user: Funcionario | null = null;
  user: Cliente | null = null;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
}
