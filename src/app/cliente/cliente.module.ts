import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteRoutingModule } from './cliente-routing.module';
import { MenuClienteComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    MenuClienteComponent
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
