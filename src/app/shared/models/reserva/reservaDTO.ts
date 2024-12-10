import { HistoricoAlteracaoEstadoDTO } from "./historico-alteracao-estado-dto";

export class ReservaDTO {

    id: number;
    dataHora: Date;
    aeroportoOrigemCod: string;
    aeroportoDestinoCod: string;
    valor: number;
    milhas: number;
    status: string;
    codigoVoo: string;
    codigoReserva: string;
    vooId: number;
    clienteId: number;
    quantidade: number;
    historicoAlteracaoEstado: HistoricoAlteracaoEstadoDTO[];
  
    constructor(
      id: number,
      dataHora: Date,
      aeroportoOrigemCod: string,
      aeroportoDestinoCod: string,
      valor: number,
      milhas: number,
      status: string,
      codigoVoo: string,
      codigoReserva: string,
      vooId: number,
      clienteId: number,
      quantidade: number,
      historicoAlteracaoEstado: HistoricoAlteracaoEstadoDTO[]
    ) {
      this.id = id;
      this.dataHora = dataHora;
      this.aeroportoOrigemCod = aeroportoOrigemCod;
      this.aeroportoDestinoCod = aeroportoDestinoCod;
      this.valor = valor;
      this.milhas = milhas;
      this.status = status;
      this.codigoVoo = codigoVoo
      this.vooId = vooId;
      this.clienteId = clienteId;
      this.codigoReserva = codigoReserva
      this.quantidade = quantidade
      this.historicoAlteracaoEstado = historicoAlteracaoEstado;
    }
  }