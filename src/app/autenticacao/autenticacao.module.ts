import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { CpfMaskDirective } from './cpf-mask.directive';
import { TelefoneMaskDirective } from './telefone-mask.directive';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    CpfMaskDirective,
    TelefoneMaskDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxMaskDirective,
    FormsModule,
    HttpClientModule

  ]
})
export class AutenticacaoModule {

}
