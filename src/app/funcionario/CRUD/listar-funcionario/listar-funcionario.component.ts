import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../../shared/services/funcionario.service';
import { Funcionario } from '../../../shared/models/funcionario/funcionario';
import { Cliente } from '../../../shared/models/cliente/cliente';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-listar-funcionario',
  templateUrl: './listar-funcionario.component.html'
})
export class ListarFuncionarioComponent implements OnInit {
  //TODO: Usar lógica para funcionário. Usando cliente apenas para testar.
  // user: Funcionario | null = null;
  user: Cliente | null = null;
  funcionarios: Funcionario[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
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

