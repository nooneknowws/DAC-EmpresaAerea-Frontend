import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from '../../../shared/models/funcionario';
import { FuncionarioService } from '../../../shared/services/funcionario.service';

@Component({
  selector: 'app-listar-funcionario',
  templateUrl: './listar-funcionario.component.html',
  styleUrls: ['./listar-funcionario.component.css']
})
export class ListarFuncionarioComponent implements OnInit {
  funcionarios: Funcionario[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarFuncionarios();
  }

  listarFuncionarios(): void {
    this.funcionarioService.listarTodos().subscribe((data: Funcionario[]) => {
      this.funcionarios = data;
    });
  }

  editarFuncionario(funcionario: Funcionario): void {
    this.router.navigate(['/funcionario/editar-funcionario', funcionario.id]);
  }

  desativarFuncionario(funcionario: Funcionario): void {
    if (confirm('Deseja realmente desativar este funcionário?')) {
      this.funcionarioService.desativarFuncionario(funcionario.id).subscribe({
        next: () => {
          alert('Funcionário desativado com sucesso.');
          this.listarFuncionarios();
        },
        error: () => {
          alert('Erro ao desativar o funcionário.');
        }
      });
    }
  }
}
