import { NgModule, Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path: 'menu-cliente', component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) export class ClienteRoutingModule {}
