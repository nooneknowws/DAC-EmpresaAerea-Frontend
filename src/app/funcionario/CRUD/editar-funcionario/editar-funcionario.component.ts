import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../../../shared/services/funcionario.service';
import { Funcionario } from '../../../shared/models/funcionario/funcionario';
import { Cliente } from '../../../shared/models/cliente/cliente';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html'
})
export class EditarFuncionarioComponent implements OnInit {
  //TODO: Usar lógica para funcionário. Usando cliente apenas para testar.
  // user: Funcionario | null = null;
  user: Cliente | null = null;
  funcionario: Funcionario = new Funcionario();

  constructor(
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.funcionarioService.buscarPorId(id).subscribe(func => this.funcionario = func);
    }
  }

  salvar(): void {
    this.funcionarioService.alterar(this.funcionario).subscribe(() => {
      this.router.navigate(['/funcionario/listar-funcionarios']);
    });
  }
}
