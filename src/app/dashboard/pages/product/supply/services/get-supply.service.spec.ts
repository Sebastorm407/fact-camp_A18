import { TestBed } from '@angular/core/testing';

import { GetSupplyService } from './get-supply.service';

describe('GetSupplyService', () => {
  let service: GetSupplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSupplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
