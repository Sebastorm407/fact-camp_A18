import { TestBed } from '@angular/core/testing';

import { DetailBillService } from './detail-bill.service';

describe('DetailBillService', () => {
  let service: DetailBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
