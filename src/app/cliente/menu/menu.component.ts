import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuClienteComponent {

  user = {
    nome: 'Jhonny Joestar',
    milhas: 46500,
  }

  aeroportos = [
    'FLN',
    'MCP',
    'CWB'
  ]


}
