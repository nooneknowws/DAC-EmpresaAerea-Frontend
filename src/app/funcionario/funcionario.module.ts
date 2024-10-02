import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { VoosListComponent } from './voos-list/voos-list.component';
import { ConfirmacaoEmbarqueComponent } from './confirmacao-embarque/confirmacao-embarque.component';
import { CancelarVooComponent } from './cancelar-voo/cancelar-voo.component';
import { RealizarVooComponent } from './realizar-voo/realizar-voo.component';
import { ListarFuncionarioComponent } from './CRUD/listar-funcionario/listar-funcionario.component';
import { InserirFuncionarioComponent } from './CRUD/inserir-funcionario/inserir-funcionario.component';
import { EditarFuncionarioComponent } from './CRUD/editar-funcionario/editar-funcionario.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    VoosListComponent,
    ConfirmacaoEmbarqueComponent,
    CancelarVooComponent,
    RealizarVooComponent,
    ListarFuncionarioComponent,
    InserirFuncionarioComponent,
    EditarFuncionarioComponent
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    FormsModule  ]
})
export class FuncionarioModule { }
