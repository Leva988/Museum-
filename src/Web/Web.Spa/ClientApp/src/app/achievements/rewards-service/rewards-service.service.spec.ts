import { TestBed } from '@angular/core/testing';

import { RewardService } from './rewards-service.service';

describe('FeedServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RewardService = TestBed.get(RewardService);
    expect(service).toBeTruthy();
  });
});
