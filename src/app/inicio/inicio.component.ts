import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/models/usuario/usuario.model';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ReservaService } from '../shared/services/reserva.service'; // Importação do serviço
import { Reserva } from '../shared/models/reserva/reserva.model';
import { Cliente } from '../shared/models/cliente/cliente';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  user: Cliente | null = null;
  reservas: Reserva[] = [];

  constructor(
    private authService: AuthService,
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getReservas();
  }

  getReservas(): void {
    this.reservaService.getReservas().subscribe((reservas: Reserva[]) => {
      this.reservas = reservas;
    });
  }

  cancelarReserva(reserva: Reserva): void {
    if (reserva.id !== undefined && reserva.id !== null) {
      if (confirm('Deseja realmente cancelar essa reserva?')) {
        this.reservaService.cancelar(reserva).subscribe(
          () => {
            // Atualiza o status da reserva localmente
            const reservaAtualizada = this.reservas.find(r => r.id === reserva.id);
            if (reservaAtualizada) {
              reservaAtualizada.status = 'Cancelada';
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
    } else {
      console.error('ID da reserva inválido');
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
