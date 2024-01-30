import { DOCUMENT } from '@angular/common';
import {
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { GeneralAssignModalComponent } from './general-assign-modal.component';
import { User } from '../../../types/types';

@Injectable({
  providedIn: 'root',
})
export class GeneralAssignModalService {
  constructor(
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(viewContainerRef: ViewContainerRef, options?: { users?: User[] }) {
    const modalComponentRef = viewContainerRef.createComponent(
      GeneralAssignModalComponent,
      {
        injector: this.injector,
      }
    );
    if (options?.users) {
      modalComponentRef.instance.users = options.users;
    }
    modalComponentRef.instance.closeEvent.subscribe(() =>
      this.closeModal(modalComponentRef)
    );
    modalComponentRef.instance.submitEvent.subscribe(() =>
      this.submitModal(modalComponentRef)
    );
    this.document.body.appendChild(modalComponentRef.location.nativeElement);
    return modalComponentRef;
  }

  closeModal(modalComponentRef: ComponentRef<GeneralAssignModalComponent>) {
    setTimeout(() => {
      modalComponentRef.destroy();
    }, 400);
  }

  submitModal(modalComponentRef: ComponentRef<GeneralAssignModalComponent>) {
    modalComponentRef.destroy();
  }
}
