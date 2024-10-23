import { Component } from '@angular/core';
import { Funcionario } from '../../../shared/models/funcionario';
import { Voo } from '../../../shared/models/voo/voo';
import { VooService } from '../../../shared/services/voo.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-realizar-voo',
  templateUrl: './realizar-voo.component.html',
  styleUrls: ['./realizar-voo.component.css']
})
export class RealizarVooComponent {
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

  realizarVoo() {
    if (this.voo) {
      this.vooService.realizarVoo(this.voo.id!).subscribe(
        () => {
          alert('Voo realizado com sucesso!');
          this.voo = null; 
        },
        () => {
          alert('Erro ao realizar o voo!');
        }
      );
    }
  }
}
