import { TestBed } from '@angular/core/testing';

import { AccountSetupService } from './account-setup.service';

describe('AccountSetupService', () => {
  let service: AccountSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
