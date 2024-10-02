import { NgModule, Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MenuClienteComponent } from './menu/menu.component';

const routes: Routes = [
  {path: 'menu', component: MenuClienteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) export class ClienteRoutingModule {}
