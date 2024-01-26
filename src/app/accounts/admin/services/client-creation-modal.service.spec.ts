import { TestBed } from '@angular/core/testing';

import { ClientCreationModalService } from './client-creation-modal.service';

describe('ClientCreationModalService', () => {
  let service: ClientCreationModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientCreationModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
