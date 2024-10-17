import { Component } from '@angular/core';
import { Reserva } from '../../../shared/models/reserva/reserva';
import { Aeroporto } from '../../../shared/models/voo/aeroporto';
import { Voo } from '../../../shared/models/voo/voo';
import { StatusReservaEnum } from '../../../shared/models/reserva/status-reserva.enum';
@Component({
  selector: 'app-consultar-reserva',
  templateUrl: './consultar-reserva.component.html',
  styleUrls: ['./consultar-reserva.component.css']
})
export class ConsultarReservaComponent {

  reserva: Reserva | null = null;

  codigoReservaInput: string = '';

  reservasFicticias: Reserva[] = [
    new Reserva(
      1,
      '18/10/2024 - 14:00',
      new Aeroporto(1, 'GRU', 'Aeroporto Internacional de São Paulo', 'São Paulo', 'SP', 'Brasil'),
      new Aeroporto(2, 'SDU', 'Aeroporto Santos Dumont', 'Rio de Janeiro', 'RJ', 'Brasil'),
      500.00,
      1000,
      StatusReservaEnum.FINALIZADO,
      new Voo('V001', '1234', new Date('2024-10-18T14:00:00'), new Aeroporto(1, 'GRU', 'Aeroporto Internacional de São Paulo', 'São Paulo', 'SP', 'Brasil'), new Aeroporto(2, 'SDU', 'Aeroporto Santos Dumont', 'Rio de Janeiro', 'RJ', 'Brasil'), 500.00, 180, 150, 'Programado')
    ),
    new Reserva(
      2,
      '19/10/2024 - 10:00',
      new Aeroporto(3, 'CGH', 'Aeroporto de Congonhas', 'São Paulo', 'SP', 'Brasil'),
      new Aeroporto(4, 'GIG', 'Aeroporto Internacional do Rio de Janeiro', 'Rio de Janeiro', 'RJ', 'Brasil'),
      350.00,
      500,
      StatusReservaEnum.PENDENTE,
      new Voo('V002', '5678', new Date('2024-10-19T10:00:00'), new Aeroporto(3, 'CGH', 'Aeroporto de Congonhas', 'São Paulo', 'SP', 'Brasil'), new Aeroporto(4, 'GIG', 'Aeroporto Internacional do Rio de Janeiro', 'Rio de Janeiro', 'RJ', 'Brasil'), 350.00, 150, 80, 'Programado')
    ),
    new Reserva(
      3,
      '20/10/2024 - 16:00',
      new Aeroporto(5, 'BSB', 'Aeroporto Internacional de Brasília', 'Brasília', 'DF', 'Brasil'),
      new Aeroporto(6, 'SSA', 'Aeroporto Internacional de Salvador', 'Salvador', 'BA', 'Brasil'),
      600.00,
      1500,
      StatusReservaEnum.CANCELADO,
      new Voo('V003', '9101', new Date('2024-10-20T16:00:00'), new Aeroporto(5, 'BSB', 'Aeroporto Internacional de Brasília', 'Brasília', 'DF', 'Brasil'), new Aeroporto(6, 'SSA', 'Aeroporto Internacional de Salvador', 'Salvador', 'BA', 'Brasil'), 600.00, 200, 100, 'Cancelado')
    )
  ];
}
