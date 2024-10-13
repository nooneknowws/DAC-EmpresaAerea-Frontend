import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteRoutingModule } from './cliente-routing.module';
import { MenuClienteComponent } from './menu/menu.component';
import { EfetuarReservaComponent } from './reserva/efetuar-reserva/efetuar-reserva.component';
import { CancelarReservaComponent } from './reserva/cancelar-reserva/cancelar-reserva.component';
import { ConsultarReservaComponent } from './reserva/consultar-reserva/consultar-reserva.component';
import { FazerCheckinComponent } from './reserva/fazer-checkin/fazer-checkin.component';


@NgModule({
  declarations: [
    MenuClienteComponent,
    EfetuarReservaComponent,
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
