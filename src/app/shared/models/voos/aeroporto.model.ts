import { EstadosBrasilEnum } from "../../enums/estados-brasil.enum";

export class Aeroporto {
    constructor(
        public codigo?: string,
        public nome?: string,
        public cidade?: string,
        public estado?: EstadosBrasilEnum,
    ) { }
}
