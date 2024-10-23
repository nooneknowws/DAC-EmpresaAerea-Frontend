import { Component, OnInit } from '@angular/core';
import { ReservaService } from './../../../shared/services/reserva.service';
import { Reserva } from '../../../shared/models/reserva/reserva';
import { Aeroporto } from '../../../shared/models/voo/aeroporto';
import { Voo } from '../../../shared/models/voo/voo';
import { AuthService } from '../../../shared/services/auth.service';
import { Cliente } from '../../../shared/models/cliente/cliente';
import { Router } from '@angular/router';
import { StatusReservaEnum } from '../../../shared/models/reserva/status-reserva.enum';

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
  reserva: Reserva | undefined;
  aeroportos: Aeroporto[] = [];
  tabelaVisivel: boolean = false;
  valorTotal: number = 0;
  valorAPagar: number = 0;
  milhasNecessarias: number = 0;

  constructor(private reservaService: ReservaService,
              private authService: AuthService,
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
  }

  calcularValorTotal() {
    this.valorTotal = this.vooSelecionado?.valorPassagem! * this.quantidadePassagens;
    this.milhasNecessarias = this.valorTotal / 10; 
    const milhasUsadasValidas = Math.min(this.milhasUsadas, this.saldoMilhas, this.milhasNecessarias);
    this.valorAPagar = this.valorTotal - milhasUsadasValidas * 10; 
  }
  
  confirmarReserva() {
    const reserva = new Reserva();
    reserva.id = this.gerarCodigoReserva();
    reserva.voo = this.vooSelecionado;
    reserva.origem = this.vooSelecionado?.origem;
    reserva.destino = this.vooSelecionado?.destino;  
    reserva.dataHora = new Date().toISOString();
    reserva.valor = this.valorTotal;
    reserva.milhas = this.milhasUsadas; 
    reserva.status = StatusReservaEnum.PENDENTE;  
  
    this.saldoMilhas -= this.milhasUsadas;
  
    this.reservaService.efetuar(reserva).subscribe(reservaCriada => {
      this.reserva = reservaCriada;
      alert(`Reserva confirmada! Código da reserva: ${this.reserva.id}`);
      this.router.navigate(['/cliente']);
    }, erro => {
      console.error("Erro ao efetuar a reserva: ", erro);
      alert("Ocorreu um erro ao tentar efetuar a reserva.");
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