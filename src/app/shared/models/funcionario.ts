import { Usuario } from "./usuario/usuario";

export class Funcionario extends Usuario {
    constructor(
      public telefone?: string,
      public funcStatus?: string
    ) { super(); }
  }
  
