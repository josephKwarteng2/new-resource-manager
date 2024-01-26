import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  Output,
  ViewContainerRef,
  OnInit,
} from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { GenericResponse, User } from '../../types/types';
// import { DeleteModalService } from '../modals/delete-modal/delete-modal.service';
import { ViewModalService } from '../modals/view-modal/view-modal.service';
import { AssignModalService } from '../modals/assign-modal/assign.service';
import { ViewModalComponent } from '../modals/view-modal/view-modal.component';
import { AssignModalComponent } from '../modals/assign-modal/assign-modal.component';
import { UsersService } from '../../../accounts/admin/services/users.service';
import { UserListComponent } from '../../../accounts/admin/components/user-list/user-list.component';
@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ClickOutsideDirective],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent implements OnInit {
  @Input() position?: { top: number; left: number };
  @Output() closeEvent = new EventEmitter<void>();
  user!: User;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  private viewModalRef?: ComponentRef<ViewModalComponent>;
  private assignModalRef?: ComponentRef<AssignModalComponent>;

  constructor(
    // private deleteModalService: DeleteModalService,
    private viewModalService: ViewModalService,
    private viewContainerRef: ViewContainerRef,
    private assignModalService: AssignModalService,
    private usersService: UsersService
  ) {}

  // openDeleteModal(user: User): void {
  //   const modalRef = this.deleteModalService.open(this.viewContainerRef, {
  //     user,
  //   });

  // modalRef.instance.deleteConfirmedEvent.subscribe({
  //   next: (response: GenericResponse) => {
  //     console.log('Deletion successful:', response);
  //   },
  //   error: (error: any) => {
  //     console.error('Error deleting user:', error);
  //   },
  // });
  // }

  ngOnInit(): void {}

  archiveUser(user: User): void {
    console.log(user);
    this.usersService.archiveUser(user.email).subscribe({
      next: (response: any) => {
        this.successMessage = response.message;

        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },

      error: (error: any) => {
        if (error.status >= 500) {
          this.errorMessage =
            'Server Error: Something went wrong on the server.';
        } else {
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'An unexpected error occurred.';
          }
        }

        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      },
    });
  }

  openViewModal(user: User) {
    this.viewModalRef = this.viewModalService.open(this.viewContainerRef, {
      user,
    });
  }

  openAssignModal(user: User) {
    this.assignModalRef = this.assignModalService.open(this.viewContainerRef, {
      user,
    });
  }

  // archiveUser(user: User): void {
  //   console.log(user);
  //   this.archiveUserEvent.emit();
  // }
  close() {
    this.closeEvent.emit();
  }
}
