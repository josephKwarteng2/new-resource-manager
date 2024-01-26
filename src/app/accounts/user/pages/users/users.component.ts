import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideNavComponent } from '../../../../shared/components/side-nav/side-nav.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ButtonAssignComponent } from '../../components/button-assign/button-assign.component';
import { ButtonNewComponent } from '../../components/button-new/button-new.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    SideNavComponent,
    HeaderComponent,
    ButtonAssignComponent,
    ButtonNewComponent,
  ],
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.css',
    '../../pages/setting/setting.component.css',
  ],
})
export class UsersComponent {}
