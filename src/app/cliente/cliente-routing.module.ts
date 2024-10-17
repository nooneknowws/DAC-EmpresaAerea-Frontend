import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardClienteComponent } from './dashboard-cliente/dashboard-cliente.component';
import { DetalheReservaComponent } from './reserva/detalhe-reserva/detalhe-reserva.component';
import { CancelarReservaComponent } from './reserva/cancelar-reserva/cancelar-reserva.component';
import { ComprarMilhasComponent } from './milhas/comprar-milhas/comprar-milhas.component';
import { ExtratoMilhasComponent } from './milhas/extrato-milhas/extrato-milhas.component';
import { ConsultarReservaComponent } from './reserva/consultar-reserva/consultar-reserva.component';
import { FazerCheckinComponent } from './fazer-checkin/fazer-checkin.component';
import { AuthGuard } from '../shared/auth.guard';
import { EfetuarReservaComponent } from './reserva/efetuar-reserva/efetuar-reserva.component';

const routes: Routes = [
  {
    path: 'cliente', 
    component: DashboardClienteComponent,
    canActivate: [AuthGuard],
    data: { role: 'cliente' } 
  },
  { path: 'cliente/detalhe-reserva/:id', component: DetalheReservaComponent },
  { path: 'cliente/cancelar-reserva/:id', component: CancelarReservaComponent },
  { path: 'cliente/comprar-milhas', component: ComprarMilhasComponent },
  { path: 'cliente/extrato-milhas', component: ExtratoMilhasComponent },
  { path: 'cliente/efetuar-reserva', component: EfetuarReservaComponent },
  { path: 'cliente/consultar-reserva', component: ConsultarReservaComponent },
  { path: 'cliente/fazer-checkin', component: FazerCheckinComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule {}
