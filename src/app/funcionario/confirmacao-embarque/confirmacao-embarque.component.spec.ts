import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoEmbarqueComponent } from './confirmacao-embarque.component';

describe('ConfirmacaoEmbarqueComponent', () => {
  let component: ConfirmacaoEmbarqueComponent;
  let fixture: ComponentFixture<ConfirmacaoEmbarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmacaoEmbarqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacaoEmbarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
