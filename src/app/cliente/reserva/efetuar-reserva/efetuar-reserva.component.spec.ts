import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarReservaComponent } from './efetuar-reserva.component';

describe('ConfirmarReservaComponent', () => {
  let component: ConfirmarReservaComponent;
  let fixture: ComponentFixture<ConfirmarReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmarReservaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
