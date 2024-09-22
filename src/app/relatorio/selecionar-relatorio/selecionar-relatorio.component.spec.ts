import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarRelatorioComponent } from './selecionar-relatorio.component';

describe('SelecionarRelatorioComponent', () => {
  let component: SelecionarRelatorioComponent;
  let fixture: ComponentFixture<SelecionarRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelecionarRelatorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionarRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
