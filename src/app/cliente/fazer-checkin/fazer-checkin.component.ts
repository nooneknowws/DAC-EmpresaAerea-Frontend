import { Component } from '@angular/core';
import { Reserva } from '../../shared/models/reserva/reserva';
import { AuthService } from '../../shared/services/auth.service';
import { ReservaService } from '../../shared/services/reserva.service';
import { Cliente } from '../../shared/models/cliente/cliente';
import { StatusReservaEnum } from '../../shared/models/reserva/status-reserva.enum';

@Component({
  selector: 'app-fazer-checkin',
  templateUrl: './fazer-checkin.component.html',
  styleUrl: './fazer-checkin.component.css'
})
export class FazerCheckinComponent {
  user: Cliente | null = null;
  reservas: Reserva[] = [];
  e = StatusReservaEnum;

  constructor(
    private authService: AuthService,
    private reservaService: ReservaService,
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

}
