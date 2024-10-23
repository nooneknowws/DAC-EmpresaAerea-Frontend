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
  codigoVooInput: string = '';
  errorMessage: string = '';

  constructor(private vooService: VooService, 
              private authService: AuthService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    const idVoo = this.route.snapshot.paramMap.get('id');
    if (idVoo) {
      this.getVoo(idVoo);
    }
  }

  getVoo(codigoVoo: string) {
    this.vooService.getVoos().subscribe(voos => {
      const vooEncontrado = voos.find(voo => voo.codigoVoo === codigoVoo);
      if (vooEncontrado) {
        this.voo = vooEncontrado;
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Voo não encontrado!';
        this.voo = null;
      }
    });
  }

  cancelarVoo() {
    if (this.voo) {
      this.vooService.cancelarVoo(this.voo.id!).subscribe(
        () => {
          alert('Voo cancelado com sucesso!');
          this.voo = null; 
        },
        () => {
          alert('Erro ao cancelar o voo!');
        }
      );
    }
  }
}
