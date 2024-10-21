import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../../../shared/services/reserva.service';
import { Cliente } from '../../../shared/models/cliente/cliente';
import { AuthService } from '../../../shared/services/auth.service';
import { Reserva } from '../../../shared/models/reserva/reserva';
import { StatusReservaEnum } from '../../../shared/models/reserva/status-reserva.enum';

@Component({
  selector: 'app-cancelar-reserva',
  templateUrl: './cancelar-reserva.component.html',
  styleUrl: './cancelar-reserva.component.css'
})
export class CancelarReservaComponent {
  user: Cliente | null = null;
  reserva: Reserva | null = null;
  loading: boolean = true;
  errorMessage: string | null = null;
  e = StatusReservaEnum;

  constructor(
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getReserva(id);
    });
  }

  getReserva(id: number): void {
    this.reservaService.getReservaById(id).subscribe(reserva => {
      this.reserva = reserva;
      this.loading = false;
    });
  }

  cancelarReserva(reserva: Reserva): void {
    if (reserva.id !== undefined && reserva.id !== null) {
      if (confirm('Deseja realmente cancelar essa reserva?')) {
        this.reservaService.cancelar(reserva).subscribe(
          () => {
            const reservaAtualizada = Array.isArray(this.reserva) ? this.reserva.find(r => r.id === reserva.id) : null;
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
    this.voltar();
  }

  voltar() {
    this.router.navigate(['/cliente']);
  }

}
