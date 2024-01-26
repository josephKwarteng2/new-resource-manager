import {
  Injectable,
  Inject,
  Injector,
  ViewContainerRef,
  TemplateRef,
  ComponentRef,
} from '@angular/core';
import { RestoreModalComponent } from './restore-modal.component';
import { User } from '../../../types/types';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RestoreModalService {
  constructor(
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  // open(viewContainerRef: ViewContainerRef, options?: {user?: User})
}
