import { EstadoReservaEnum } from "../../enums/estado-reserva.enum";

export class EstadoReserva {
  constructor(
    public codigoEstado?: number,
    public siglaEstado?: string,
    public descricaoEstado?: EstadoReservaEnum
  ) { }
}
