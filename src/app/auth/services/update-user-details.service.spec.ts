import { TestBed } from '@angular/core/testing';

import { UpdateUserDetailsService } from './update-user-details.service';

describe('UpdateUserDetailsService', () => {
  let service: UpdateUserDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateUserDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
