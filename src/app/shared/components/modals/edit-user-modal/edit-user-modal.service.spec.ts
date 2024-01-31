import { TestBed } from '@angular/core/testing';

import { EditUserModalService } from './edit-user-modal.service';

describe('EditUserModalService', () => {
  let service: EditUserModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditUserModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
