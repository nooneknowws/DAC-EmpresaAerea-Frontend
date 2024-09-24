import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
<<<<<<< HEAD
import { LoginComponent } from './autenticacao/login/login.component';
import { CadastroComponent } from './autenticacao/cadastro/cadastro.component';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
  declarations: [AppComponent, CadastroComponent, LoginComponent, InicioComponent],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [provideHttpClient()],
=======
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, CadastroComponent],
  imports: [RouterModule, BrowserModule, FormsModule, AppRoutingModule, NgbModule],
  providers: [],
>>>>>>> d16d104e132e2e51dd185b9f0bbf217f5de52c0a
  bootstrap: [AppComponent],
})
export class AppModule {}