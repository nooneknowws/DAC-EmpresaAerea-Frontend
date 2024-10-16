import { NgModule } from "@angular/core";
import { EfetuarReservaComponent } from "./reserva/efetuar-reserva/efetuar-reserva.component";
import { DetalheReservaComponent } from "./reserva/detalhe-reserva/detalhe-reserva.component";
import { CancelarReservaComponent } from "./reserva/cancelar-reserva/cancelar-reserva.component";
import { ConsultarReservaComponent } from "./reserva/consultar-reserva/consultar-reserva.component";
import { FazerCheckinComponent } from "./reserva/fazer-checkin/fazer-checkin.component";
import { CommonModule } from "@angular/common";
import { ClienteRoutingModule } from "./cliente-routing.module";

@NgModule({
  declarations: [
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
  ]
})
export class ClienteModule { }
