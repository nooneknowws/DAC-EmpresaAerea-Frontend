import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../shared/models/reserva/reserva.model';
import { ClienteService } from '../../shared/services/cliente.service';


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

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.listarTodos().subscribe(reservas => this.reservas = reservas);
  }

  cancelarReserva(reserva: Reserva): void{
    if (reserva.id !== undefined) {
      if (confirm('Deseja realmente cancelar essa reserva?')) {
        this.clienteService.cancelar(reserva)
    } else {
      console.error('ID da reserva não existe')
    }
  }
}
}
