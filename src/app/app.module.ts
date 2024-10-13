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
import { DetalheReservaComponent } from './cliente/reserva/detalhe-reserva/detalhe-reserva.component';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { ComprarComponent } from './milhas/comprar/comprar.component';
import { ConsultarComponent } from './milhas/consultar/consultar.component';
import { EfetuarReservaComponent } from './cliente/reserva/efetuar-reserva/efetuar-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    LoginComponent,
    InicioComponent,
    DetalheReservaComponent,
    ComprarComponent,
    ConsultarComponent,
    EfetuarReservaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FuncionarioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
