import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from '../../shared/models/funcionario';
import { Voo } from '../../shared/models/voo/voo';
import { AuthService } from '../../shared/services/auth.service';
import { VooService } from '../../shared/services/voo.service';

@Component({
  selector: 'app-dashboard-funcionario',
  templateUrl: './dashboard-funcionario.component.html',
  styleUrl: './dashboard-funcionario.component.css'
})
export class DashboardFuncionarioComponent {
  user: Funcionario | null = null; 
  voos: Voo[] = []; 

  constructor(
    private authService: AuthService, 
    private vooService: VooService, 
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser() as Funcionario; 
    this.getVoos(); 
  }

  getVoos(): void {
    this.vooService.getVoos().subscribe((voos: Voo[]) => {
      this.voos = voos;
    });
  }

  confirmarEmbarque(voo: Voo): void {
    this.router.navigate(['/funcionario/confirmar-embarque', voo.id]);
  }

  cancelarVoo(voo: Voo): void {
    this.router.navigate(['/funcionario/cancelar-voo', voo.id]);
    /*this.vooService.cancelarVoo(voo.id!).subscribe(() => {
      this.getVoos(); 
    });*/
  }
  
  realizarVoo(voo: Voo): void {
    this.router.navigate(['/funcionario/realizar-voo', voo.id]);
    /*this.vooService.realizarVoo(voo.id!).subscribe(() => {
      this.getVoos(); 
    });*/
  }  

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}
