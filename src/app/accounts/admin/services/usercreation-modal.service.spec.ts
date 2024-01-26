import { TestBed } from '@angular/core/testing';

import { UsercreationModalService } from './usercreation-modal.service';

describe('UsercreationModalService', () => {
  let service: UsercreationModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsercreationModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
