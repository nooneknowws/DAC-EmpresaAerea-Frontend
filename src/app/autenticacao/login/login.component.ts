import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Usuario } from '../../shared/models/usuario/usuario';
import { Funcionario } from '../../shared/models/funcionario';
import { Cliente } from '../../shared/models/cliente/cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: '',
    senha: ''
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  user: Usuario = {};

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.isLoggedIn = true;
      this.user = user;

      if ('milhas' in user) {
        this.router.navigate(['/cliente']);
      } else {
        this.router.navigate(['/funcionario']);
      }
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { email, senha } = this.form;

      this.authService.login(email, senha).subscribe({
        next: (data: Cliente | Funcionario | null) => {
          if (data) {
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.user = data;

            if ('milhas' in data) {
              this.router.navigate(['/cliente']);
            } else {
              this.router.navigate(['/funcionario']);
            }
          } else {
            this.errorMessage = 'Credenciais inválidas';
            this.isLoginFailed = true;
          }
        },
        error: err => {
          this.errorMessage = err.error.message || 'Erro ao realizar o login';
          this.isLoginFailed = true;
        }
      });
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
