import { Component, OnInit } from '@angular/core';
import { ReservaService } from './../../../shared/services/reserva.service';
import { Reserva } from '../../../shared/models/reserva/reserva';
import { Aeroporto } from '../../../shared/models/voo/aeroporto';
import { Voo } from '../../../shared/models/voo/voo';
import { AuthService } from '../../../shared/services/auth.service';
import { Cliente } from '../../../shared/models/cliente/cliente';
import { Router } from '@angular/router';
import { StatusReservaEnum } from '../../../shared/models/reserva/status-reserva.enum';
import { ClienteService } from '../../../shared/services/cliente.service';
import { ReservaDTO } from '../../../shared/models/reserva/reservaDTO';

@Component({
  selector: 'app-efetuar-reserva',
  templateUrl: './efetuar-reserva.component.html',
  styleUrls: ['./efetuar-reserva.component.css']
})
export class EfetuarReservaComponent implements OnInit {
  aeroportoOrigem?: Aeroporto = undefined;
  aeroportoDestino?: Aeroporto = undefined;
  voosFiltrados: Voo[] = [];
  vooSelecionado?: Voo = undefined;
  saldoMilhas: number = 0;
  quantidadePassagens: number = 0;
  milhasUsadas: number = 0;
  reserva: Reserva | ReservaDTO | undefined;
  aeroportos: Aeroporto[] = [];
  tabelaVisivel: boolean = false;
  valorTotal: number = 0;
  valorAPagar: number = 0;
  milhasNecessarias: number = 0;

  constructor(private reservaService: ReservaService,
              private authService: AuthService,
              private clienteService: ClienteService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.reservaService.getAeroportos().subscribe(aeroportos => {
      this.aeroportos = aeroportos;
    });
  }

  setAeroportos(aeroportoOrigem: Aeroporto | undefined, aeroportoDestino: Aeroporto | undefined) {
    this.aeroportoOrigem = aeroportoOrigem;
    this.aeroportoDestino = aeroportoDestino;
    
    if (this.aeroportoOrigem && this.aeroportoDestino) {
      this.reservaService.getVoosFiltrados(aeroportoOrigem!, aeroportoDestino!).subscribe(voosFiltrados => {
        this.voosFiltrados = voosFiltrados;
        this.tabelaVisivel = true;
      });
    }
  }  

  selecionarVoo(voo: Voo) {
    this.vooSelecionado = voo;
    this.tabelaVisivel = !this.tabelaVisivel;
    const cliente = this.authService.getUser() as Cliente;
    this.saldoMilhas = cliente.saldoMilhas!;
    console.log(voo)
  }

  calcularValorTotal() {
    this.valorTotal = this.vooSelecionado?.valorPassagem! * this.quantidadePassagens;
    this.milhasNecessarias = this.valorTotal / 10; 
    const milhasUsadasValidas = Math.min(this.milhasUsadas, this.saldoMilhas, this.milhasNecessarias);
    this.valorAPagar = this.valorTotal - milhasUsadasValidas * 10; 
  }
  
  confirmarReserva() {
    const clienteId = this.authService.getUser()!.id!;
    const codigoReserva = this.gerarCodigoReserva();

    const reservaDTO = new ReservaDTO(
      0,
      new Date(),
      this.vooSelecionado!.origem!.id!,  // aeroportoOrigemId
      this.vooSelecionado!.destino!.id!, // aeroportoDestinoId
      this.valorTotal,
      this.milhasUsadas,
      StatusReservaEnum.PENDENTE,
      parseInt(this.vooSelecionado!.id!), // vooId
      parseInt(clienteId),
      [] // historicoAlteracaoEstado
    );

    // Update the client's miles balance
    this.saldoMilhas -= this.milhasUsadas;

    const descricaoTransacao = `${this.vooSelecionado?.origem?.codigo}->${this.vooSelecionado?.destino?.codigo}`;
    
    this.clienteService.processarTransacaoMilhas(
      this.milhasUsadas,
      'SAIDA',
      clienteId,
      descricaoTransacao,
    ).subscribe({
      next: () => {
        console.log("Milhas registradas no extrato.");
        this.reservaService.efetuar(reservaDTO).subscribe({
          next: (reservaCriada) => {
            this.reserva = reservaCriada;
            alert(`Reserva confirmada! Código da reserva: ${codigoReserva}`);
            this.router.navigate(['/cliente']);
          },
          error: (erro) => {
            console.error("Erro ao efetuar a reserva: ", erro);
            alert("Ocorreu um erro ao tentar efetuar a reserva.");
          }
        });
      },
      error: (erro) => {
        console.error("Erro ao registrar milhas no extrato:", erro);
        if (erro.error === "Saldo insuficiente") {
          alert("Saldo de milhas insuficiente para realizar esta reserva.");
        } else {
          alert("Ocorreu um erro ao processar as milhas para a reserva.");
        }
      }
    });
  }

  gerarCodigoReserva(): string {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    let codigo = '';
  
    for (let i = 0; i < 3; i++) {
      codigo += letras.charAt(Math.floor(Math.random() * letras.length));
    }
    for (let i = 0; i < 3; i++) {
      codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
    }
  
    return codigo;
  }
}