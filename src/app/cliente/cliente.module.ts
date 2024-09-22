import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultarPedidoComponent } from './consultar-pedido/consultar-pedido.component';
import { InicialClienteComponent } from './inicial-cliente/inicial-cliente.component';
import { ListarPedidosComponent } from './listar-pedidos/listar-pedidos.component';
import { OrcamentoClienteComponent } from './orcamento-cliente/orcamento-cliente.component';
import { PedidosClienteComponent } from './pedidos-cliente/pedidos-cliente.component';



@NgModule({
  declarations: [
    ConsultarPedidoComponent,
    InicialClienteComponent,
    ListarPedidosComponent,
    OrcamentoClienteComponent,
    PedidosClienteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClienteModule { }
