import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../../shared/services/funcionario.service';
import { Funcionario } from '../../../shared/models/funcionario/funcionario';

@Component({
  selector: 'app-listar-funcionario',
  templateUrl: './listar-funcionario.component.html'
})
export class ListarFuncionarioComponent implements OnInit {
  funcionarios: Funcionario[] = [];

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.funcionarioService.listarTodos().subscribe(funcionarios => this.funcionarios = funcionarios);
  }

  removerFuncionario(id: number | undefined): void {
    if (id !== undefined) {
      if (confirm('Deseja realmente remover este funcionário?')) {
        this.funcionarioService.remover(id).subscribe(() => {
          this.funcionarios = this.funcionarios.filter(func => func.id !== id);
        });
      }
    } else {
      console.error('ID do funcionário é indefinido');
    }
  }
}

