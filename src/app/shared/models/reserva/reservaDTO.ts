import { HistoricoAlteracaoEstadoDTO } from "./historico-alteracao-estado-dto";

export class ReservaDTO {
    id: number;
    dataHora: Date;
    aeroportoOrigemId: number;
    aeroportoDestinoId: number;
    valor: number;
    milhas: number;
    status: string;
    vooId: number;
    clienteId: number;
    historicoAlteracaoEstado: HistoricoAlteracaoEstadoDTO[];
  
    constructor(
      id: number,
      dataHora: Date,
      aeroportoOrigemId: number,
      aeroportoDestinoId: number,
      valor: number,
      milhas: number,
      status: string,
      vooId: number,
      clienteId: number,
      historicoAlteracaoEstado: HistoricoAlteracaoEstadoDTO[]
    ) {
      this.id = id;
      this.dataHora = dataHora;
      this.aeroportoOrigemId = aeroportoOrigemId;
      this.aeroportoDestinoId = aeroportoDestinoId;
      this.valor = valor;
      this.milhas = milhas;
      this.status = status;
      this.vooId = vooId;
      this.clienteId = clienteId;
      this.historicoAlteracaoEstado = historicoAlteracaoEstado;
    }
  }