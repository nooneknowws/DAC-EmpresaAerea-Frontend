import { Aeroporto } from "../voos/aeroporto.model";
import { Voo } from "../voos/voo.model";

export class Reserva {
    constructor(
        public id: number,
        public dataHora: string,
        public origem: Aeroporto,
        public destino: Aeroporto,
        public valor: number,
        public milhas: number,
        public status: string,
        public voo: Voo
    ){}
}
