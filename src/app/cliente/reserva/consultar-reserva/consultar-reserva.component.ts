import { Component } from '@angular/core';
import { Reserva } from '../../../shared/models/reserva/reserva';
import { StatusReservaEnum } from '../../../shared/models/reserva/status-reserva.enum';
import { ReservaService } from '../../../shared/services/reserva.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-consultar-reserva',
  templateUrl: './consultar-reserva.component.html',
  styleUrls: ['./consultar-reserva.component.css']
})
export class ConsultarReservaComponent {
  reserva: Reserva | null = null;
  codigoReservaInput: number = 0;
  e = StatusReservaEnum;
  errorMessage: string = '';

  public constructor(
    private reservaService: ReservaService,
    private router: Router
  ){}

  ngOnInit(){
  }

  getReserva(id: string): void {
    this.reservaService.getReservaById(id).subscribe(
      (reserva) => {
        if (reserva) {
          this.reserva = reserva;
          this.errorMessage = '';
        } else {
          this.reserva = null;
          this.errorMessage = 'Reserva não encontrada!';
        }
      },
      (error) => {
        this.reserva = null;
        this.errorMessage = 'Erro ao buscar reserva!';
      }
    );
  }

  fazerCheckin() {
    this.router.navigate(['/cliente/fazer-checkin'])
  }

  cancelarReserva(reserva: Reserva) {
    this.router.navigate(['cliente/cancelar-reserva/', reserva.id])
  }
}
