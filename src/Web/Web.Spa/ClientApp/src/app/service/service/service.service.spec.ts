import { TestBed } from '@angular/core/testing';

import { Service } from './service.service';
import { ServiceComponent } from '../service.component';

describe('HistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Service = TestBed.get(ServiceComponent);
    expect(service).toBeTruthy();
  });
});
