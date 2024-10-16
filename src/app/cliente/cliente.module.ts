import { CommonModule } from "@angular/common";
import { MenuClienteComponent } from "./menu/menu.component";
import { CancelarReservaComponent } from "./reserva/cancelar-reserva/cancelar-reserva.component";
import { ConsultarReservaComponent } from "./reserva/consultar-reserva/consultar-reserva.component";
import { EfetuarReservaComponent } from "./reserva/efetuar-reserva/efetuar-reserva.component";
import { FazerCheckinComponent } from "./reserva/fazer-checkin/fazer-checkin.component";
import { ClienteRoutingModule } from "./cliente-routing.module";
import { NgModule } from "@angular/core";
import { DetalheReservaComponent } from "./reserva/detalhe-reserva/detalhe-reserva.component";

@NgModule({
  declarations: [
    MenuClienteComponent,
    EfetuarReservaComponent,
    DetalheReservaComponent,
    CancelarReservaComponent,
    ConsultarReservaComponent,
    FazerCheckinComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ],
  exports: [
    MenuClienteComponent
  ]
})
export class ClienteModule { }
