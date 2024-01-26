import { DOCUMENT } from '@angular/common';
import {
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ViewModalComponent } from './view-modal.component';
import { User } from '../../../types/types';

@Injectable({
  providedIn: 'root',
})
export class ViewModalService {
  constructor(
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(viewContainerRef: ViewContainerRef, options?: { user?: User }) {
    const modalComponentRef = viewContainerRef.createComponent(
      ViewModalComponent,
      {
        injector: this.injector,
      }
    );
    if (options?.user) {
      modalComponentRef.instance.user = options.user;
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

  closeModal(modalComponentRef: ComponentRef<ViewModalComponent>) {
    /**
     * This timer is to make the modal fade out before destroying it
     */
    setTimeout(() => {
      modalComponentRef.destroy();
    }, 400);
  }

  submitModal(modalComponentRef: ComponentRef<ViewModalComponent>) {
    modalComponentRef.destroy();
  }
}
