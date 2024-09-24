import { Usuario } from "./usuario.model";

export class Funcionario extends Usuario {
  constructor(
    public cpf?: string,
    public telefone?: string,
    public matricula?: string
  ) { super(); }
}
