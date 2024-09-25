import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoosListComponent } from './voos-list.component';

describe('VoosListComponent', () => {
  let component: VoosListComponent;
  let fixture: ComponentFixture<VoosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
