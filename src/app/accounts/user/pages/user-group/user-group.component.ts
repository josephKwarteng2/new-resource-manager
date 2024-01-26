import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideNavComponent } from '../../../../shared/components/side-nav/side-nav.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-user-group',
  standalone: true,
  imports: [CommonModule, SideNavComponent, HeaderComponent],
  templateUrl: './user-group.component.html',
  styleUrl: './user-group.component.css',
})
export class UserGroupComponent {}
