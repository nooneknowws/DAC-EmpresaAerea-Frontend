import { Component, OnInit } from '@angular/core';
import { VooService } from '../../../shared/services/voo.service';
import { ReservaService } from '../../../shared/services/reserva.service'; // Importar o serviço de reserva
import { Voo } from '../../../shared/models/voo/voo';
import { Aeroporto } from '../../../shared/models/voo/aeroporto';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-voo',
  templateUrl: './cadastrar-voo.component.html',
  styleUrls: ['./cadastrar-voo.component.css']
})
export class CadastrarVooComponent implements OnInit {
  novoVoo: Voo = new Voo();
  aeroportos: Aeroporto[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private vooService: VooService,
    private reservaService: ReservaService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarAeroportos(); 
  }

  carregarAeroportos() {
    this.reservaService.getAeroportos().subscribe(
      (aeroportos: Aeroporto[]) => {
        this.aeroportos = aeroportos;
      },
      error => {
        this.errorMessage = 'Erro ao carregar os aeroportos!';
        console.error(error);
      }
    );
  }

  cadastrarVoo() {
    if (this.validarFormulario()) {
      this.novoVoo.quantidadePassageiros = 0;
      this.vooService.cadastrarVoo(this.novoVoo).subscribe(
        () => {
          alert('Voo cadastrado com sucesso!');
          this.router.navigate(['/funcionario']);
          this.resetarFormulario();
        },
        error => {
          this.errorMessage = 'Erro ao cadastrar o voo!';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios!';
    }
  }

  validarFormulario(): boolean {
    return !!this.novoVoo.codigoVoo && 
          !!this.novoVoo.dataHoraPartida && 
          this.novoVoo.valorPassagem! > 0 && 
          this.novoVoo.quantidadeAssentos! > 0;
  }

  resetarFormulario() {
    this.novoVoo = new Voo();
    this.successMessage = '';
    this.errorMessage = '';
  }
}
