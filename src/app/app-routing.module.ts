import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './autenticacao/login/login.component';
import { CadastroComponent } from './autenticacao/cadastro/cadastro.component';
import { HttpClient } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {path: 'cadastro', component: CadastroComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: InicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
