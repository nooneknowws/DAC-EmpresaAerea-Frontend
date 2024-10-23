import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reserva } from '../../../shared/models/reserva/reserva';
import { StatusReservaEnum } from '../../../shared/models/reserva/status-reserva.enum';
import { ReservaService } from '../../../shared/services/reserva.service';

@Component({
  selector: 'app-confirmar-embarque',
  templateUrl: './confirmar-embarque.component.html',
  styleUrls: ['./confirmar-embarque.component.css']
})
export class ConfirmarEmbarqueComponent implements OnInit {
  codigoReservaInput: string = '';
  reserva: Reserva | null = null;
  errorMessage: string = '';
  e = StatusReservaEnum;

  constructor(private reservaService: ReservaService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idReserva = this.route.snapshot.paramMap.get('id');
    if (idReserva) {
      this.getReserva(idReserva);
    }
  }

  getReserva(codigoReserva: string) {
    const idReserva = Number(codigoReserva);
    this.reservaService.getReservaById(idReserva).subscribe(
      (reserva) => {
        if (reserva.status === 'Confirmado') {
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
