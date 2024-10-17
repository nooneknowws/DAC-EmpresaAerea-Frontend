import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardFuncionarioComponent } from './dashboard-funcionario/dashboard-funcionario.component';
import { ConfirmarEmbarqueComponent } from './voo/confirmar-embarque/confirmar-embarque.component';
import { CancelarVooComponent } from './voo/cancelar-voo/cancelar-voo.component';
import { RealizarVooComponent } from './voo/realizar-voo/realizar-voo.component';
import { CadastrarVooComponent } from './voo/cadastrar-voo/cadastrar-voo.component';
import { ListarFuncionarioComponent } from './_crud/listar-funcionario/listar-funcionario.component';
import { CadastrarFuncionarioComponent } from './_crud/cadastrar-funcionario/cadastrar-funcionario.component';
import { AuthGuard } from '../shared/auth.guard';
import { EditarFuncionarioComponent } from './_crud/editar-funcionario/editar-funcionario.component';

const routes: Routes = [
  {
    path: 'funcionario', 
    component: DashboardFuncionarioComponent,
    canActivate: [AuthGuard],
    data: { role: 'funcionario' } 
  },
  { path: 'funcionario/confirmar-embarque/:id', component: ConfirmarEmbarqueComponent },
  { path: 'funcionario/cancelar-voo/:id', component: CancelarVooComponent },
  { path: 'funcionario/realizar-voo/:id', component: RealizarVooComponent },
  { path: 'funcionario/cadastrar-voo', component: CadastrarVooComponent },
  { path: 'funcionario/listar-funcionarios', component: ListarFuncionarioComponent },
  { path: 'funcionario/cadastrar-funcionario', component: CadastrarFuncionarioComponent },
  { path: 'funcionario/editar-funcionario/:id', component: EditarFuncionarioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
