import {
  Injectable,
  ComponentRef,
  Inject,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { User } from '../../../types/types';

@Injectable({
  providedIn: 'root',
})
export class EditUserModalService {
  constructor(
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  // open(viewContainerRef: ViewContainerRef, option);
}
