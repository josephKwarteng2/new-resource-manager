import { TestBed } from '@angular/core/testing';

import { ManagerUsercreationService } from './manager-usercreation.service';

describe('ManagerUsercreationService', () => {
  let service: ManagerUsercreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerUsercreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
