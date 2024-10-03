import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../shared/models/reserva/reserva.model';
import { ReservaService } from '../../shared/services/reserva.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuClienteComponent implements OnInit{
  reservas: Reserva[] = [];
  user = {
    nome: 'Jhonny Joestar',
    milhas: 46500,
  }

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.reservaService.getReservas().subscribe(reservas => this.reservas = reservas);
  }

  cancelarReserva(reserva: Reserva): void{
    if (reserva.id !== undefined) {
      if (confirm('Deseja realmente cancelar essa reserva?')) {
        this.reservaService.cancelar(reserva)
    } else {
      console.error('ID da reserva não existe')
    }
  }
}
}
