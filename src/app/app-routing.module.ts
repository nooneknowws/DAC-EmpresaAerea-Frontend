import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './autenticacao/cadastro/cadastro.component';
import { LoginComponent } from './autenticacao/login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { VoosListComponent } from './funcionario/voos-list/voos-list.component';
import { ConfirmacaoEmbarqueComponent } from './funcionario/confirmacao-embarque/confirmacao-embarque.component';
import { CancelarVooComponent } from './funcionario/cancelar-voo/cancelar-voo.component';
import { RealizarVooComponent } from './funcionario/realizar-voo/realizar-voo.component';
import { ListarFuncionarioComponent } from './funcionario/CRUD/listar-funcionario/listar-funcionario.component';
import { EditarFuncionarioComponent } from './funcionario/CRUD/editar-funcionario/editar-funcionario.component';
import { InserirFuncionarioComponent } from './funcionario/CRUD/inserir-funcionario/inserir-funcionario.component';
import { DetalheReservaComponent } from './reserva/detalhe-reserva/detalhe-reserva.component';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'reserva/:id', component: DetalheReservaComponent },
  {
    path: 'funcionario',
    children: [
      { path: 'listar-funcionarios', component: ListarFuncionarioComponent},
      { path: 'editar-funcionarios', component: EditarFuncionarioComponent},
      { path: 'editar-funcionarios/:id', component:EditarFuncionarioComponent},
      { path: 'inserir-funcionarios', component: InserirFuncionarioComponent},
      { path: 'voos-list', component: VoosListComponent },
      { path: 'confirmacao-embarque', component: ConfirmacaoEmbarqueComponent },
      { path: 'cancelar-voo', component: CancelarVooComponent },
      { path: 'realizar-voo', component: RealizarVooComponent },
    ]
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' } // Redireciona para a página inicial
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
