import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideNavComponent } from '../../../../shared/components/side-nav/side-nav.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SideNavComponent, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
