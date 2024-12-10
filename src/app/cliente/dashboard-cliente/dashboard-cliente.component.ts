import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReservaDTO } from '../../shared/models/reserva/reservaDTO';
import { Reserva } from '../../shared/models/reserva/reserva';
import { AuthService } from '../../shared/services/auth.service';
import { ReservaService } from '../../shared/services/reserva.service';
import { Router } from '@angular/router';
import { Cliente } from '../../shared/models/cliente/cliente';
import { StatusReservaEnum } from '../../shared/models/reserva/status-reserva.enum';
import { Usuario } from '../../shared/models/usuario/usuario';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.component.html',
  styleUrls: ['./dashboard-cliente.component.css']
})
export class DashboardClienteComponent implements OnInit, OnDestroy {
  reservas: ReservaDTO[] = [];
  e = StatusReservaEnum;
  user: Cliente | null = null;
  cliente: Cliente = {};
  isLoading = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.user = this.authService.getUser();
    
    if (this.user?.id) {
      this.loadClientData(this.user.id);
    }

    this.authService.currentUser
      .pipe(takeUntil(this.destroy$))
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
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (reservas: ReservaDTO[]) => {
          console.log('Received reservas data:', JSON.stringify(reservas, null, 2));
          this.reservas = reservas;
        },
        error: (error) => {
          console.error('Error fetching reservas:', error);
        }
      });
  }
  
  cancelarReserva(reserva: ReservaDTO): void {
    this.router.navigate(['/cliente/cancelar-reserva/' + reserva.id]);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error:', error);
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}