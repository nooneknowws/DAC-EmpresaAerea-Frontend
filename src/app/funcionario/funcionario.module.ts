import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from './data/data.component';
import { EditarFuncionarioComponent } from './editar-funcionario/editar-funcionario.component';
import { InicialFuncionarioComponent } from './inicial-funcionario/inicial-funcionario.component';
import { InserirFuncionarioComponent } from './inserir-funcionario/inserir-funcionario.component';
import { ListarFuncionarioComponent } from './listar-funcionario/listar-funcionario.component';
import { ListarPedidosComponent } from './listar-pedidos/listar-pedidos.component';
import { ConfirmarPedidoComponent } from './confirmar-pedido/confirmar-pedido.component';



@NgModule({
  declarations: [
    DataComponent,
    EditarFuncionarioComponent,
    InicialFuncionarioComponent,
    InserirFuncionarioComponent,
    ListarFuncionarioComponent,
    ListarPedidosComponent,
    ConfirmarPedidoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FuncionarioModule { }
