import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import {
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DeleteModalComponent } from './delete-modal.component';
import { User, GenericResponse } from '../../../types/types';
import { UsersService } from '../../../../accounts/admin/services/users.service';
import { tap, finalize, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteModalService {
  constructor(
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document,
    private usersService: UsersService
  ) {}

  open(viewContainerRef: ViewContainerRef, options?: { user?: User }) {
    const modalComponentRef = viewContainerRef.createComponent(
      DeleteModalComponent,
      {
        injector: this.injector,
      }
    );
    if (options?.user) {
      modalComponentRef.instance.user = options.user;
    }
    modalComponentRef.instance.deleteConfirmedEvent.subscribe(() =>
      this.deleteConfirmed(modalComponentRef, options?.user?.email)
    );
    modalComponentRef.instance.cancelEvent.subscribe(() =>
      this.cancelModal(modalComponentRef)
    );
    this.document.body.appendChild(modalComponentRef.location.nativeElement);

    return modalComponentRef;
  }

  private deleteConfirmed(
    modalComponentRef: ComponentRef<DeleteModalComponent>,
    userEmail: string | undefined
  ): Observable<GenericResponse> {
    if (userEmail !== undefined) {
      this.usersService.deleteUser(userEmail).subscribe(
        response => {
          console.log(response);
          this.destroyModal(modalComponentRef);
        },
        error => {
          console.error('Error deleting user:', error);
          this.destroyModal(modalComponentRef);
        }
      );
    } else {
      console.error('User email is undefined');
      this.destroyModal(modalComponentRef);
    }
    return EMPTY;
  }

  cancelModal(modalComponentRef: ComponentRef<DeleteModalComponent>) {
    this.destroyModal(modalComponentRef);
  }

  private destroyModal(modalComponentRef: ComponentRef<DeleteModalComponent>) {
    setTimeout(() => {
      modalComponentRef.destroy();
    }, 400);
  }
}
