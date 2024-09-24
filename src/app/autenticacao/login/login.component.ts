import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Usuario } from '../../shared/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    senha: null
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
      this.router.navigate(['/']); 
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { email, senha } = this.form;

      this.authService.login(email, senha).subscribe({
        next: data => {
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.user = data.user!; 
          this.router.navigate(['/']); 
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
