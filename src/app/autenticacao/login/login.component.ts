import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from 'src/app/shared/models/login.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin! : NgForm;
  login: Login = new Login();
  loading: boolean = false;
  message!: string;

  constructor(
    private LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ){
    if(this.LoginService.usuarioLogado) {
      this.router.navigate(["funcionario/inicialFuncionario"])
    }
  }
  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.message = params['error'];
      })
  }
  logar(): void {
    this.loading = true;
    if (this.formLogin.form.valid) {
      this.LoginService.login(this.login).subscribe(
        (usu) => {
          if (usu != null) {
            this.LoginService.usuarioLogado = usu;
            this.loading = false;
            const perfil = usu.perfil;
            switch (perfil) {
              case 'CLIENTE':
                this.router.navigate(["cliente/inicialCliente"]);
                break;
              default:
                this.router.navigate(["funcionario/inicialFuncionario"]);
                break;
            }
          } else {
            this.message = "Login ou Senha são Inválidos.";
          }
        },
        (error) => {
          console.error(error); // Log the error
          this.loading = false;
          if (error === 'Authentication failed. Invalid email or password.') {
            this.message = 'Login ou Senha são Inválidos.';
          } else {
            this.message = 'Login ou Senha são Inválidos.';
          }
        }
      );
    } else {
      this.loading = false;
    }
  }


}
