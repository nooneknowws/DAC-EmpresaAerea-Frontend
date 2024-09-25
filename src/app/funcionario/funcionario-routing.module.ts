import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoosListComponent } from './voos-list/voos-list.component';
import { ConfirmacaoEmbarqueComponent } from './confirmacao-embarque/confirmacao-embarque.component';
import { CancelarVooComponent } from './cancelar-voo/cancelar-voo.component';
import { RealizarVooComponent } from './realizar-voo/realizar-voo.component';

const routes: Routes = [
  { path: 'voos-list', component: VoosListComponent },
  { path: 'confirmacao-embarque', component: ConfirmacaoEmbarqueComponent },
  { path: 'cancelar-voo', component: CancelarVooComponent },
  { path: 'realizar-voo', component: RealizarVooComponent },
  { path: '', redirectTo: '/voos-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
