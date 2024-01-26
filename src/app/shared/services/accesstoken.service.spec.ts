import { TestBed } from '@angular/core/testing';

import { AccesstokenService } from './accesstoken.service';

describe('AccesstokenService', () => {
  let service: AccesstokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesstokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
