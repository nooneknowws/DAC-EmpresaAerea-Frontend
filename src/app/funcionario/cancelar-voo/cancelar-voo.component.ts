import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
// import { Funcionario } from '../../shared/models/funcionario/funcionario';
import { Cliente } from '../../shared/models/cliente/cliente';

@Component({
  selector: 'app-cancelar-voo',
  templateUrl: './cancelar-voo.component.html',
  styleUrls: ['./cancelar-voo.component.css']
})
export class CancelarVooComponent implements OnInit {
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
