import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../../../shared/services/reserva.service';
import { Cliente } from '../../../shared/models/cliente/cliente';
import { AuthService } from '../../../shared/services/auth.service';
import { Reserva } from '../../../shared/models/reserva/reserva';
import { StatusReservaEnum } from '../../../shared/models/reserva/status-reserva.enum';

@Component({
  selector: 'app-detalhe-reserva',
  templateUrl: './detalhe-reserva.component.html',
  styleUrl: './detalhe-reserva.component.css'
})
export class DetalheReservaComponent {
  user: Cliente | null = null;
  reserva: Reserva | null = null;
  loading: boolean = true;
  errorMessage: string | null = null;
  e = StatusReservaEnum;

  constructor(
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getReserva(id);
    });
  }

  getReserva(id: string): void {
    this.reservaService.getReservaById(id).subscribe(reserva => {
      this.reserva = reserva;
      this.loading = false;
    });
  }
}
