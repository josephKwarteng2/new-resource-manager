import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArchiveSubjectService {
  constructor() {}

  archiveSubject = new Subject<void>();
}

export { Subject };
