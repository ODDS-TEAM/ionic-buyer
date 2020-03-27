import { TestBed } from '@angular/core/testing';

import { CoEatingService } from './co-eating.service';

describe('CoEatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoEatingService = TestBed.get(CoEatingService);
    expect(service).toBeTruthy();
  });
});
