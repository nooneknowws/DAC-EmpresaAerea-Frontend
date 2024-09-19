import { Endereco } from "./endereco";

export class Cliente {

  constructor(
    public id?: number,
    public nome?: string,
    public login?: string,
    public senha?: string,
    public perfil?: string,
    public cpf?: string,
    public email?: string,
    public endereco?: Endereco,

  ){}
}

