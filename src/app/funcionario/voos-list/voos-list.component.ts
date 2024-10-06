import { Component, OnInit } from '@angular/core';
import { VooService } from '../../shared/services/voo.service';
import { Voo } from '../../shared/models/voos/voo.model';
import { Cliente } from '../../shared/models/cliente/cliente';

@Component({
  selector: 'app-voos-list',
  templateUrl: './voos-list.component.html',
  styleUrls: ['./voos-list.component.css']
})
export class VoosListComponent implements OnInit {
  user: Cliente | null = null;
  voos: Voo[] = [];

  constructor(private vooService: VooService) {}

  ngOnInit(): void {
    this.vooService.getVoos().subscribe((data: Voo[]) => {
      this.voos = data;
    });
  }
}
