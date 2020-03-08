import { TestBed } from '@angular/core/testing';

import { DataLocalServiceService } from './data-local-service.service';

describe('DataLocalServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataLocalServiceService = TestBed.get(DataLocalServiceService);
    expect(service).toBeTruthy();
  });
});
