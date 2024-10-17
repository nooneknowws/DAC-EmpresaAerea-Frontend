import { Usuario } from "./usuario/usuario";

export class Funcionario extends Usuario {
    constructor(
      public matricula?: string,
    ) { super(); }
  }
  
