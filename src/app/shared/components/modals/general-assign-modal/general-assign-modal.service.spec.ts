import { TestBed } from '@angular/core/testing';

import { GeneralAssignModalService } from './general-assign-modal.service';

describe('GeneralAssignModalService', () => {
  let service: GeneralAssignModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralAssignModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
