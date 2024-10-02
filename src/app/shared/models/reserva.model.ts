import { Aeroporto } from "./aeroporto.model";

export class Reserva {
    constructor(
        public id: number,
        public dataHora: string,
        public origem: Aeroporto,
        public destino: Aeroporto,
        public valor: number,
        public milhas: number,
        public status: string
    ){}
}
