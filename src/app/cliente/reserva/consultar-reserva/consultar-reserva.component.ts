import { Component } from '@angular/core';
import { Reserva } from '../../../shared/models/reserva/reserva';
import { StatusReservaEnum } from '../../../shared/models/reserva/status-reserva.enum';
import { ReservaService } from '../../../shared/services/reserva.service';
import { Router } from '@angular/router';
import { ReservaDTO } from '../../../shared/models/reserva/reservaDTO';
@Component({
  selector: 'app-consultar-reserva',
  templateUrl: './consultar-reserva.component.html',
  styleUrls: ['./consultar-reserva.component.css']
})
export class ConsultarReservaComponent {
  reserva: ReservaDTO | null = null;
  codigoReservaInput: string = "";
  e = StatusReservaEnum;
  loading: boolean = true;
  errorMessage: string | null = null;

  public constructor(
    private reservaService: ReservaService,
    private router: Router
  ){}

  ngOnInit(){
  }

  getReserva(id: string): void {
    this.loading = true;
    this.errorMessage = null;
    
    this.reservaService.getReservaByCod(id).subscribe({
      next: (reserva) => {
        this.reserva = reserva;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching reserva:', error);
        this.errorMessage = 'Erro ao carregar detalhes da reserva';
        this.loading = false;
      }
    });
  }

  fazerCheckin() {
    this.router.navigate(['/cliente/fazer-checkin'])
  }

  cancelarReserva(reserva: ReservaDTO) {
    this.router.navigate(['cliente/cancelar-reserva/', reserva.id])
  }
}
