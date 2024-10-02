import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../../../shared/services/funcionario.service';
import { Funcionario } from '../../../shared/models/funcionario/funcionario';

@Component({
  selector: 'app-inserir-funcionario',
  templateUrl: './inserir-funcionario.component.html'
})
export class InserirFuncionarioComponent {
  funcionario: Funcionario = new Funcionario();

  constructor(private funcionarioService: FuncionarioService, private router: Router) {}

  salvar(): void {
    this.funcionarioService.inserir(this.funcionario).subscribe(() => {
      this.router.navigate(['/funcionario/listar-funcionarios']);
    });
  }
}
