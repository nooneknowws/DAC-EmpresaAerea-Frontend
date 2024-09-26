import { Endereco } from "./endereco.model";

export class Usuario {
    constructor(
      public id?: number,
      public cpf?: string,
      public nome?: string,
      public email?: string,
      public senha?: string,
      public endereco?: Endereco,
    ) {}
}