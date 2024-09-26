import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import necessário para ngModel
import { RouterModule } from '@angular/router'; // Import necessário para routerLink
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './autenticacao/login/login.component';
import { CadastroComponent } from './autenticacao/cadastro/cadastro.component';
import { InicioComponent } from './inicio/inicio.component';
import { InserirFuncionarioComponent } from './funcionario/CRUD/inserir-funcionario/inserir-funcionario.component';
import { EditarFuncionarioComponent } from './funcionario/CRUD/editar-funcionario/editar-funcionario.component';
import { ListarFuncionarioComponent } from './funcionario/CRUD/listar-funcionario/listar-funcionario.component';
import { ClienteModule } from './cliente/cliente.module';


@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    LoginComponent,
    InicioComponent,
    InserirFuncionarioComponent,
    EditarFuncionarioComponent,
    ListarFuncionarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Necessário para ngModel
    RouterModule, // Necessário para routerLink
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ClienteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
