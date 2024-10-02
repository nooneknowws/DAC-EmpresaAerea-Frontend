import { Usuario } from "../usuario/usuario.model";
import { Milhas } from "../cliente/milhas.model";

export class Cliente extends Usuario {
  constructor(
    public telefone?: string,
    public milhas?: Milhas,
  ) { super(); }
}
