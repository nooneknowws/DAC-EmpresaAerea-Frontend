import { Component, OnInit } from '@angular/core';
import { ReservaService } from './../../../shared/services/reserva.service';
import { Reserva } from '../../../shared/models/reserva/reserva';
import { Aeroporto } from '../../../shared/models/voo/aeroporto';
import { Voo } from '../../../shared/models/voo/voo';
import { AuthService } from '../../../shared/services/auth.service';
import { Cliente } from '../../../shared/models/cliente/cliente';
import { Router } from '@angular/router';

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
  reserva: any = null;
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

  efetuarReserva() {
    const reserva = new Reserva();
    reserva.voo = this.vooSelecionado;
    this.reservaService.efetuar(reserva).subscribe(reserva => {
      this.reserva = reserva;
    });
  }

  calcularValorTotal() {
    this.valorTotal = this.vooSelecionado?.valorPassagem! * this.quantidadePassagens;
    this.milhasNecessarias = this.valorTotal / 10; 
    const milhasUsadasValidas = Math.min(this.milhasUsadas, this.saldoMilhas, this.milhasNecessarias);
    this.valorAPagar = this.valorTotal - milhasUsadasValidas * 10; 
  }
  
  confirmarReserva() {
    const reserva = new Reserva();
    reserva.voo = this.vooSelecionado;
    reserva.origem = this.vooSelecionado?.origem;
    reserva.destino = this.vooSelecionado?.destino;  
    reserva.dataHora = new Date().toDateString();  
    this.saldoMilhas -= this.milhasUsadas;
  
    this.reservaService.efetuar(reserva).subscribe(reserva => {
      this.reserva = reserva;
      this.reserva.codigoReserva = this.gerarCodigoReserva();
      alert(`Reserva confirmada! Código da reserva: ${this.reserva.codigoReserva}`);
      this.router.navigate(['/cliente']);
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