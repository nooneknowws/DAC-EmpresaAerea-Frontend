import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { VoosListComponent } from './voos-list/voos-list.component';
import { ConfirmacaoEmbarqueComponent } from './confirmacao-embarque/confirmacao-embarque.component';
import { CancelarVooComponent } from './cancelar-voo/cancelar-voo.component';
import { RealizarVooComponent } from './realizar-voo/realizar-voo.component';

@NgModule({
  declarations: [
    VoosListComponent,
    ConfirmacaoEmbarqueComponent,
    CancelarVooComponent,
    RealizarVooComponent
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule
  ]
})
export class FuncionarioModule { }
