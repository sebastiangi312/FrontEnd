import { TestBed } from '@angular/core/testing';

import { FillScoreboardsService } from './fill-scoreboards.service';

describe('FillScoreboardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FillScoreboardsService = TestBed.get(FillScoreboardsService);
    expect(service).toBeTruthy();
  });
});
