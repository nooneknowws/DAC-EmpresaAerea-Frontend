import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardFuncionarioComponent } from './dashboard-funcionario/dashboard-funcionario.component';
import { CancelarVooComponent } from './voo/cancelar-voo/cancelar-voo.component';
import { RealizarVooComponent } from './voo/realizar-voo/realizar-voo.component';
import { CadastrarVooComponent } from './voo/cadastrar-voo/cadastrar-voo.component';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { EditarFuncionarioComponent } from './_crud/editar-funcionario/editar-funcionario.component';
import { ListarFuncionarioComponent } from './_crud/listar-funcionario/listar-funcionario.component';
import { CadastrarFuncionarioComponent } from './_crud/cadastrar-funcionario/cadastrar-funcionario.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardFuncionarioComponent,
    CancelarVooComponent,
    RealizarVooComponent,
    CadastrarVooComponent,
    EditarFuncionarioComponent,
    ListarFuncionarioComponent,
    CadastrarFuncionarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FuncionarioRoutingModule
  ]
})
export class FuncionarioModule { }
