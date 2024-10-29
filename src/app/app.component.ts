import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public static readonly title = 'DAC-EmpresaAerea-Frontend';
  public static readonly PUBLIC_BACKEND_URL = 'http://localhost:3000';

  isLoggedIn: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }
}
