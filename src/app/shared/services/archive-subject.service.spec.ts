import { TestBed } from '@angular/core/testing';

import { ArchiveSubjectService } from './archive-subject.service';

describe('ArchiveSubjectService', () => {
  let service: ArchiveSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchiveSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
