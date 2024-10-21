import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './autenticacao/login/login.component';
import { CadastroComponent } from './autenticacao/cadastro/cadastro.component';
import { InicioComponent } from './autenticacao/inicio/inicio.component';
import { AuthGuard } from './shared/auth.guard';
import { HomeRedirectComponent } from './home-redirect/home-redirect.component';

const routes: Routes = [
  { path: '', component: HomeRedirectComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./cliente/cliente.module').then((m) => m.ClienteModule),
    canActivate: [AuthGuard],
    data: { role: 'cliente' },
  },
  {
    path: 'funcionario',
    loadChildren: () =>
      import('./funcionario/funcionario.module').then(
        (m) => m.FuncionarioModule
      ),
    canActivate: [AuthGuard],
    data: { role: 'funcionario' },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
