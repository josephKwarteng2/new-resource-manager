import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideNavComponent } from '../../../../shared/components/side-nav/side-nav.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ButtonAssignComponent } from '../../../user/components/button-assign/button-assign.component';
import { ButtonNewComponent } from '../../../user/components/button-new/button-new.component';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UsercreationComponent } from '../usercreation/usercreation.component';
import { ManagerUsercreationComponent } from '../../../manager/pages/manager-usercreation/manager-usercreation.component';
import { ArchivedListComponent } from '../../components/archived-list/archived-list.component';

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
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  userCreationModalOpen = false;
  display: 'all' | 'archives' = 'all';
  closed: boolean = false;
  opening: boolean = true;

  toggleDisplay(view: 'all' | 'archives'): void {
    this.display = view;
  }

  openUserCreationModal() {
    this.userCreationModalOpen = true;
  }

  get toggleClasses() {
    return {
      [`currentview`]: true,
      [`opening`]: this.opening,
      [`closed`]: this.closed,
    };
  }
}
