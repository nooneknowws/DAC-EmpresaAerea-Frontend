import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../../../shared/models/reserva/reserva';
import { StatusReservaEnum } from '../../../shared/models/reserva/status-reserva.enum';
import { ReservaService } from '../../../shared/services/reserva.service';

@Component({
  selector: 'app-confirmar-embarque',
  templateUrl: './confirmar-embarque.component.html',
  styleUrls: ['./confirmar-embarque.component.css']
})
export class ConfirmarEmbarqueComponent {
  codigoReservaInput: string = '';
  reserva: Reserva | null = null;
  errorMessage: string = '';
  e = StatusReservaEnum;

  constructor(private reservaService: ReservaService) {}

  getReserva(codigoReserva: string) {
    const idReserva = Number(codigoReserva);
    this.reservaService.getReservaById(idReserva).subscribe(
      (reserva) => {
        if (reserva.status === 'Pendente') {
          this.reserva = reserva;
          this.errorMessage = '';
        } else {
          this.errorMessage = 'A reserva não está pendente ou já foi processada!';
          this.reserva = null;
        }
      },
      () => {
        this.errorMessage = 'Reserva não encontrada!';
        this.reserva = null;
      }
    );
  }

  confirmarEmbarque() {
    if (this.reserva) {
      this.reservaService.confirmarEmbarque(this.reserva).subscribe(
        () => {
          alert('Embarque confirmado com sucesso!');
        },
        () => {
          alert('Erro ao confirmar o embarque!');
        }
      );
    }
  }
}

