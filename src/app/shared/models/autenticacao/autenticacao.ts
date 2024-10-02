import { Usuario } from "../usuario/usuario.model";

export class Autenticacao {
  constructor(
    public token?: string,
    public user?: Usuario
  ) {}
}
