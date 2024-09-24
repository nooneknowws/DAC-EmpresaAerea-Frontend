import { Usuario } from "./usuario.model";

export class Cliente extends Usuario {
  constructor(
    public telefone?: string,
    public milhas?: number
  ) { super(); }
}
