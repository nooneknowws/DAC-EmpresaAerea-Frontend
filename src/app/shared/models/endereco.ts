export class Endereco {
    constructor(
      public id: number,
      public cep: number,
      public rua: string,
      public complemento: string,
      public cidade: string,
      public estado: string
    ) {}
  }