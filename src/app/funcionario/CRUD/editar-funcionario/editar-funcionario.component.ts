import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../../../shared/services/funcionario.service';
import { Funcionario } from '../../../shared/models/funcionario';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html'
})
export class EditarFuncionarioComponent implements OnInit {
  funcionario: Funcionario = new Funcionario();

  constructor(
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
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
