export class HistoricoAlteracaoEstadoDTO {
    id: number;
    dataHora: Date;
    status: string;
  
    constructor(id: number, dataHora: Date, status: string) {
      this.id = id;
      this.dataHora = dataHora;
      this.status = status;
    }
  }