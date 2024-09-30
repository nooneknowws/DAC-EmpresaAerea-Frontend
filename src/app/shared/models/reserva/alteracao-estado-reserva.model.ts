import { EstadoReservaEnum } from "../../enums/estado-reserva.enum";

export class AlteracaoEstadoReserva {
  constructor(
    public codigoReserva?: string,
    public dataHoraAlteracao?: string,
    public estadoOrigem?: EstadoReservaEnum,
    public estadoDestino?: EstadoReservaEnum,
  ) {}
}
