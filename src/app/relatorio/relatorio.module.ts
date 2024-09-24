import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioClienteComponent } from './relatorio-cliente/relatorio-cliente.component';
import { RelatorioReceitaComponent } from './relatorio-receita/relatorio-receita.component';
import { SelecionarRelatorioComponent } from './selecionar-relatorio/selecionar-relatorio.component';



@NgModule({
  declarations: [
    RelatorioClienteComponent,
    RelatorioReceitaComponent,
    SelecionarRelatorioComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RelatorioModule { }
