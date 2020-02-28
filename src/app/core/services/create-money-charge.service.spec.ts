import { TestBed } from '@angular/core/testing';

import { CreateMoneyChargeService } from './create-money-charge.service';

describe('CreateMoneyChargeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateMoneyChargeService = TestBed.get(CreateMoneyChargeService);
    expect(service).toBeTruthy();
  });
});
