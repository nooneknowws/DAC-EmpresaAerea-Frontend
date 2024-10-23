import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reserva } from '../../../shared/models/reserva/reserva';
import { StatusReservaEnum } from '../../../shared/models/reserva/status-reserva.enum';
import { Voo } from '../../../shared/models/voo/voo';
import { ReservaService } from '../../../shared/services/reserva.service';
import { VooService } from '../../../shared/services/voo.service';

@Component({
  selector: 'app-confirmar-embarque',
  templateUrl: './confirmar-embarque.component.html',
  styleUrls: ['./confirmar-embarque.component.css']
})
export class ConfirmarEmbarqueComponent implements OnInit {
  codigoReservaInput: string = '';
  reserva: Reserva | null = null;
  voo: Voo | null = null; 
  errorMessage: string = '';
  e = StatusReservaEnum;

  constructor(private reservaService: ReservaService,
              private vooService: VooService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idVoo = this.route.snapshot.paramMap.get('id');
    if (idVoo) {
      this.getVoo(idVoo)
    }
  }

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

  getVoo(codigoVoo: string) {
    this.vooService.getVooById(Number(codigoVoo)).subscribe(voo => {
      this.voo = voo;
    });
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
