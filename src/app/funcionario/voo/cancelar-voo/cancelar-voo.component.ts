import { Component } from '@angular/core';
import { Funcionario } from '../../../shared/models/funcionario';
import { Voo } from '../../../shared/models/voo/voo';
import { VooService } from '../../../shared/services/voo.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-cancelar-voo',
  templateUrl: './cancelar-voo.component.html',
  styleUrl: './cancelar-voo.component.css'
})
export class CancelarVooComponent {
  user: Funcionario | null = null;
  voo: Voo | null = null;
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private vooService: VooService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getVooById(id);
    });
  }

  getVooById(id: number): void {
    this.vooService.getVooById(id).subscribe(voo => {
      this.voo = voo;
      this.loading = false;
    });
  }
}
