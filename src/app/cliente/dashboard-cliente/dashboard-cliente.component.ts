import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Reserva } from '../../shared/models/reserva/reserva';
import { AuthService } from '../../shared/services/auth.service';
import { ReservaService } from '../../shared/services/reserva.service';
import { Router } from '@angular/router';
import { Cliente } from '../../shared/models/cliente/cliente';
import { StatusReservaEnum } from '../../shared/models/reserva/status-reserva.enum';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.component.html',
  styleUrls: ['./dashboard-cliente.component.css']
})
export class DashboardClienteComponent implements OnInit, OnDestroy {
  user: Cliente | null = null;
  reservas: Reserva[] = [];
  e = StatusReservaEnum;
  
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user as Cliente;
        if (this.user) {
          this.getReservas();
        }
      });
  }

  getReservas(): void {
    this.reservaService.getReservas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (reservas: Reserva[]) => {
          this.reservas = reservas;
        },
        error: (error) => {
          console.error('Error fetching reservas:', error);
        }
      });
  }

  cancelarReserva(reserva: Reserva): void {
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