import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DAC-EmpresaAerea-Frontend';
  public static PUBLIC_BACKEND_URL = 'http://localhost:8080/auth';  
  isAuthRoute: boolean = false;

  componenteAtivo: string;
  constructor(private router:Router){
    this.componenteAtivo = ''
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAuthRoute = ['/login', '/cadastro'].includes(event.url);
        const routeSegments = event.url.split('/');
        this.componenteAtivo = routeSegments[routeSegments.length - 1];
      }
      console.log(this.componenteAtivo);
    });
  }
}
