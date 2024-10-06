import { TestBed } from '@angular/core/testing';

import { CreateSupplyService } from './create-supply.service';

describe('CreateSupplyService', () => {
  let service: CreateSupplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSupplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
