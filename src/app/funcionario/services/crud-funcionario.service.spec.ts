import { TestBed } from '@angular/core/testing';

import { CrudFuncionarioService } from './crud-funcionario.service';

describe('CrudFuncionarioService', () => {
  let service: CrudFuncionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudFuncionarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
