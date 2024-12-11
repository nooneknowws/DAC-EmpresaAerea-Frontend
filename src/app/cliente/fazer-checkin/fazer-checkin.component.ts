import { Component, OnInit  } from '@angular/core';
import { Reserva } from '../../shared/models/reserva/reserva';
import { AuthService } from '../../shared/services/auth.service';
import { ReservaService } from '../../shared/services/reserva.service';
import { Cliente } from '../../shared/models/cliente/cliente';
import { StatusReservaEnum } from '../../shared/models/reserva/status-reserva.enum';
import { ReservaDTO } from '../../shared/models/reserva/reservaDTO';

@Component({
  selector: 'app-fazer-checkin',
  templateUrl: './fazer-checkin.component.html',
  styleUrl: './fazer-checkin.component.css'
})
export class FazerCheckinComponent implements OnInit {
  user: Cliente | null = null;
  reservas: ReservaDTO[] = [];
  e = StatusReservaEnum;
  cliente: Cliente = {};
  isLoading = false;


  constructor(
    private authService: AuthService,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.user = this.authService.getUser();
    
    if (this.user?.id) {
      this.loadClientData(this.user.id);
    }

    this.authService.currentUser
      .subscribe(user => {
        this.user = user as Cliente;
        if (this.user?.id) {
          this.loadClientData(this.user.id);
        }
        this.isLoading = false;
      });
  }

  private loadClientData(userId: string): void {
    this.authService.getCliente(userId).subscribe({
      next: (cliente: Cliente) => {
        console.log("Client data:", cliente);
        this.cliente = cliente;
        if (cliente.id) {
          this.getReservas(cliente.id);
        }
      },
      error: (error) => {
        console.error("Error fetching client data:", error);
      }
    });
  }

  getReservas(clienteId: string): void {
    this.reservaService.getReservasByClienteId(clienteId)
      .subscribe({
        next: (reservas: ReservaDTO[]) => {
          this.reservas = reservas;
        },
        error: (error) => {
          console.error('Error fetching reservas:', error);
        }
      });
  }

  realizarCheckin(reserva: ReservaDTO): void {
    this.reservaService.confirmarReserva(reserva.id)
      .subscribe({
        next: (response) => {
          console.log('Check-in successful:', response);
          if (this.cliente.id) {
            this.getReservas(this.cliente.id);
          }
        },
        error: (error) => {
          console.error('Error during check-in:', error);
        }
      });
  }

}
