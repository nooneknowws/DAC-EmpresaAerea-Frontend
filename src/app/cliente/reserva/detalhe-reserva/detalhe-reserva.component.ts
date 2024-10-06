import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reserva } from '../../../shared/models/reserva/reserva.model';
import { ReservaService } from '../../../shared/services/reserva.service';
import { Cliente } from '../../../shared/models/cliente/cliente';

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

  constructor(
    private reservaService: ReservaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
}
