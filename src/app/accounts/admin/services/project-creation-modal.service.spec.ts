import { TestBed } from '@angular/core/testing';

import { ProjectCreationModalService } from './project-creation-modal.service';

describe('ProjectCreationModalService', () => {
  let service: ProjectCreationModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectCreationModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
