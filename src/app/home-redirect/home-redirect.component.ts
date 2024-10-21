import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service'; // O serviço de autenticação que armazena o tipo de usuário

@Component({
  selector: 'app-home-redirect',
  template: '',
})
export class HomeRedirectComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userRole = this.authService.getUserRole();

    if (userRole === 'cliente') {
      this.router.navigate(['/cliente']);
    } else if (userRole === 'funcionario') {
      this.router.navigate(['/funcionario']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
