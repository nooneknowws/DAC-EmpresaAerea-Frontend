import { Component, OnInit } from '@angular/core';
//import { Funcionario } from '../../shared/models/funcionario/funcionario';
import { Cliente } from '../../shared/models/cliente/cliente';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-realizar-voo',
  templateUrl: './realizar-voo.component.html',
  styleUrls: ['./realizar-voo.component.css']
})
export class RealizarVooComponent implements OnInit {
  //TODO: Usar lógica para funcionário. Usando cliente apenas para testar.
  //user: Funcionario | null = null;
  user: Cliente | null = null;
  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
}
