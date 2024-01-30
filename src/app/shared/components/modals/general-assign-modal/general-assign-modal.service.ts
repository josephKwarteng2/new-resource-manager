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
  // private onSelectCallback: ((selectedUsers: User[]) => void) | null = null;
  // constructor(
  //   private injector: Injector,
  //   @Inject(DOCUMENT) private document: Document
  // ) {}
  // open(viewContainerRef: ViewContainerRef, options?: { user?: User }) {
  //   const modalComponentRef = viewContainerRef.createComponent(
  //     GeneralAssignModalComponent,
  //     {
  //       injector: this.injector,
  //     }
  //   );
  //   if (options?.user) {
  //     modalComponentRef.instance.user = options.user;
  //   }
  //   modalComponentRef.instance.closeAssignEvent.subscribe(() =>
  //     this.closeModal(modalComponentRef)
  //   );
  //   modalComponentRef.instance.submitEvent.subscribe(() =>
  //     this.submitModal(modalComponentRef)
  //   );
  //   modalComponentRef.instance.selectedUsersEvent.subscribe(
  //     (selectedUsers: User[]) => {
  //       if (this.onSelectCallback) {
  //         this.onSelectCallback(selectedUsers);
  //       }
  //     }
  //   );
  //   this.document.body.appendChild(modalComponentRef.location.nativeElement);
  //   return modalComponentRef;
  // }
  // closeModal(modalComponentRef: ComponentRef<GeneralAssignModalComponent>) {
  //   /**
  //    * This timer is to make the modal fade out before destroying it
  //    */
  //   setTimeout(() => {
  //     modalComponentRef.destroy();
  //   }, 400);
  // }
  // submitModal(modalComponentRef: ComponentRef<GeneralAssignModalComponent>) {
  //   modalComponentRef.destroy();
  // }
  // private handleSelect(selectedUsers: User[]) {
  //   if (this.onSelectCallback) {
  //     this.onSelectCallback(selectedUsers);
  //   }
  // }
  // // Expose a method to set the onSelect callback
  // setOnSelectCallback(callback: (selectedUsers: User[]) => void) {
  //   this.onSelectCallback = callback;
  // }

  constructor(
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(viewContainerRef: ViewContainerRef, options?: { user?: User }) {
    const modalComponentRef = viewContainerRef.createComponent(
      GeneralAssignModalComponent,
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

  closeModal(modalComponentRef: ComponentRef<GeneralAssignModalComponent>) {
    setTimeout(() => {
      modalComponentRef.destroy();
    }, 400);
  }

  submitModal(modalComponentRef: ComponentRef<GeneralAssignModalComponent>) {
    modalComponentRef.destroy();
  }
}
