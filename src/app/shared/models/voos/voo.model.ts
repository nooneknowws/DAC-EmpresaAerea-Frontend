import { Aeroporto } from './aeroporto.model';

export class Voo {
    constructor(
        public codigoVoo?: string,
        public dataHoraPartida?: string,
        public origem?: Aeroporto,
        public destino?: Aeroporto,
        public valorPassagem?: number,
        public quantidadeAssentos?: number,
        public quantidadePassageiros?: number,
    ) { }
}
