import { TestBed } from '@angular/core/testing';

import { BetsListService } from './bets-list.service';

describe('BetsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BetsListService = TestBed.get(BetsListService);
    expect(service).toBeTruthy();
  });
});
