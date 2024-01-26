import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserListComponent } from '../../../admin/components/user-list/user-list.component';
import { ButtonAssignComponent } from '../../../user/components/button-assign/button-assign.component';
import { ButtonNewComponent } from '../../../user/components/button-new/button-new.component';
import { User } from '../../../../shared/types/types';
import { ManagerUsercreationComponent } from '../manager-usercreation/manager-usercreation.component';
import { ArchivedListComponent } from '../../../admin/components/archived-list/archived-list.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    UserListComponent,
    ButtonAssignComponent,
    ButtonNewComponent,
    ManagerUsercreationComponent,
    ArchivedListComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  managerUserCreationModalOpen = false;
  display: 'all' | 'archives' = 'all';
  closed: boolean = false;
  opening: boolean = true;

  openManagerUserCreationModal() {
    this.managerUserCreationModalOpen = true;
  }

  toggleDisplay(view: 'all' | 'archives'): void {
    this.display = view;
  }

  handleAssignModal(selectedUsers: User[]): void {
    console.log('Selected Users:', selectedUsers);
    // Perform any additional logic with selected users
    // You can store them in a property or perform any other action
  }

  get toggleClasses() {
    return {
      [`currentview`]: true,
      [`opening`]: this.opening,
      [`closed`]: this.closed,
    };
  }
}
