import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/models/usuario/usuario.model';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ReservaService } from '../shared/services/reserva.service'; // Importação do serviço
import { Reserva } from '../shared/models/reserva.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  user: Usuario | null = null;
  reservas: Reserva[] = [];

  constructor(
    private authService: AuthService,
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getReservas();
  }

  getReservas(): void {
    this.reservaService.getReservas().subscribe((reservas: Reserva[]) => {
      this.reservas = reservas;
    });
  }

  cancelarReserva(arg0: any) {
    throw new Error('Method not implemented.');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}