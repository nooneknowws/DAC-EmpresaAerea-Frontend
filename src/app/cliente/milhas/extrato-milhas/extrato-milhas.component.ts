import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { ClienteService } from '../../../shared/services/cliente.service';
import { Milhas } from '../../../shared/models/cliente/milhas';
import { Cliente } from '../../../shared/models/cliente/cliente';

@Component({
  selector: 'app-extrato-milhas',
  templateUrl: './extrato-milhas.component.html',
  styleUrl: './extrato-milhas.component.css'
})
export class ExtratoMilhasComponent {
  cliente: Cliente | null = null;
  milhas: Milhas[] | undefined;

  constructor(private clienteService: ClienteService, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.clienteService.getClienteById(user.id).subscribe(
        cliente => {
          this.cliente = cliente;
          this.milhas = cliente.milhas;
        },
        error => {
          console.error('Erro ao buscar informações do cliente:', error);
        }
      );
    }
  }
}
