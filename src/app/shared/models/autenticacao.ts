import { Usuario } from "./usuario.model";

export class Autenticacao {
  constructor(
    public token?: string,
    public user?: Usuario
  ) {}
}