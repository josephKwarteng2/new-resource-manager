import { TestBed } from '@angular/core/testing';

import { ResetToggleService } from './reset-toggle.service';

describe('ResetToggleService', () => {
  let service: ResetToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
