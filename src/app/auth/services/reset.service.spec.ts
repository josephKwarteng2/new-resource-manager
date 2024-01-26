import { TestBed } from '@angular/core/testing';

import { ResetService } from './reset.service.js';

describe('ToggleOtpService', () => {
  let service: ResetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
