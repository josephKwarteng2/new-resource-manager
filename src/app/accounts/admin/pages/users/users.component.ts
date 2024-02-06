import { CommonModule } from '@angular/common';
import {
  Component,
  ViewContainerRef,
  ComponentRef,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { User } from '../../../../shared/types/types';

import { SideNavComponent } from '../../../../shared/components/side-nav/side-nav.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ButtonAssignComponent } from '../../../user/components/button-assign/button-assign.component';
import { ButtonNewComponent } from '../../../user/components/button-new/button-new.component';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UsercreationComponent } from '../usercreation/usercreation.component';
import { ManagerUsercreationComponent } from '../../../manager/pages/manager-usercreation/manager-usercreation.component';
import { ArchivedListComponent } from '../../components/archived-list/archived-list.component';
import { GeneralAssignModalComponent } from '../../../../shared/components/modals/general-assign-modal/general-assign-modal.component';
import { GeneralAssignModalService } from '../../../../shared/components/modals/general-assign-modal/general-assign-modal.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    SideNavComponent,
    HeaderComponent,
    ButtonAssignComponent,
    ButtonNewComponent,
    UserListComponent,
    UsercreationComponent,
    ManagerUsercreationComponent,
    ArchivedListComponent,
    GeneralAssignModalComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements AfterViewInit{
  userCreationModalOpen = false;
  selectedUsers: User[] = [];
  @Output() selectedUsersEvent = new EventEmitter<User[]>();
  

  private assignModalRef?: ComponentRef<GeneralAssignModalComponent>;

  constructor(
    private generalAssignModalService: GeneralAssignModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  display: 'all' | 'archives' = 'all';
  closed: boolean = false;
  opening: boolean = true;

  toggleDisplay(view: 'all' | 'archives'): void {
    this.display = view;
  }

  openUserCreationModal() {
    this.userCreationModalOpen = true;
  }

  @ViewChild(UserListComponent) UserListComponent?: UserListComponent;
  successMessage: string | null = null;
  ngAfterViewInit(): void {
   
    if (this.UserListComponent) {
      this.UserListComponent.fetchUsers();
    }
  }
  updateUsers(): void {
    if (this.UserListComponent) {
      this.UserListComponent.fetchUsers();
      console.log('new user fetch')
      this.successMessage = 'User created successfully!';

      this.userCreationModalOpen = false;

    
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    }
  }

  openGeneralAssignModal() {
    this.assignModalRef = this.generalAssignModalService.open(
      this.viewContainerRef,
      {
        users: this.selectedUsers,
      }
    );
  }

  toggleUserSelection(user: User): void {
    if (this.isSelected(user)) {
      this.selectedUsers = this.selectedUsers.filter(u => u !== user);
    } else {
      this.selectedUsers.push(user);
    }

    console.log('Selected Users:', this.selectedUsers);

    this.selectedUsersEvent.emit(this.selectedUsers);
  }

  isSelected(user: User): boolean {
    return this.selectedUsers.includes(user);
  }
  get toggleClasses() {
    return {
      [`currentview`]: true,
      [`opening`]: this.opening,
      [`closed`]: this.closed,
    };
  }
}
