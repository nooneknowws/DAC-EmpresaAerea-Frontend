import { Usuario } from "../usuario/usuario.model";

export class Cliente extends Usuario {
  constructor(
    public telefone?: string,
    public milhas?: number
  ) { super(); }
}
