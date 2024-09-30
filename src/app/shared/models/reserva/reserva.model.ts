import { EstadoReserva } from "./estado-reserva.model";

export class Reserva {
    constructor(
        public codigoReserva?: string,
        public codigoVoo?: string,
        public dataHoraReserva?: Date,
        public estadoReserva?: EstadoReserva,
    ) { }
}
