import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../../../shared/services/funcionario.service';
import { Funcionario } from '../../../shared/models/funcionario/funcionario';
import { Cliente } from '../../../shared/models/cliente/cliente';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-inserir-funcionario',
  templateUrl: './inserir-funcionario.component.html'
})
export class InserirFuncionarioComponent implements OnInit{
  //TODO: Usar lógica para funcionário. Usando cliente apenas para testar.
  // user: Funcionario | null = null;
  user: Cliente | null = null;
  funcionario: Funcionario = new Funcionario();

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  salvar(): void {
    this.funcionario.perfil = "Funcionario"
    this.funcionarioService.inserir(this.funcionario).subscribe(() => {
      this.router.navigate(['/funcionario/listar-funcionarios']);
    });
  }
}
