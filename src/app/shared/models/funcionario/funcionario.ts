import { Usuario } from '../usuario/usuario.model';

export class Funcionario extends Usuario {
  constructor(
    public telefone?: string,
  ) { super(); }
}
