import { Component } from '@angular/core';
import { Reserva } from '../../shared/models/reserva/reserva';
import { AuthService } from '../../shared/services/auth.service';
import { ReservaService } from '../../shared/services/reserva.service';
import { Router } from '@angular/router';
import { Cliente } from '../../shared/models/cliente/cliente';
import { StatusReservaEnum } from '../../shared/models/reserva/status-reserva.enum';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.component.html',
  styleUrl: './dashboard-cliente.component.css'
})
export class DashboardClienteComponent {
  user: Cliente | null = null;
  reservas: Reserva[] = [];
  e = StatusReservaEnum;

  constructor(
    private authService: AuthService,
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser() as Cliente;
    this.getReservas();
  }

  getReservas(): void {
    this.reservaService.getReservas().subscribe((reservas: Reserva[]) => {
      this.reservas = reservas;
    });
  }

  cancelarReserva(reserva: Reserva): void {
    /*  Método pra cancelar de verdade - mover para outra tela
    if (reserva.id !== undefined && reserva.id !== null) {
      if (confirm('Deseja realmente cancelar essa reserva?')) {
        this.reservaService.cancelar(reserva).subscribe(
          () => {
            const reservaAtualizada = this.reservas.find(r => r.id === reserva.id);
            if (reservaAtualizada) {
              reservaAtualizada.status = this.e.CANCELADO;
              console.log(`Reserva ${reserva.id} cancelada com sucesso.`);
            } else {
              console.error('Reserva não encontrada na lista.');
            }
          },
          error => {
            console.error('Erro ao cancelar a reserva:', error);
          }
        );
      }
    } else console.error('ID da reserva inválido');
    */
    this.router.navigate(['/cliente/cancelar-reserva/' + reserva.id]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
