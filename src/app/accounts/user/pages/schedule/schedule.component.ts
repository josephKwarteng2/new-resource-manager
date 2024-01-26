import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { SideNavComponent } from '../../../../shared/components/side-nav/side-nav.component';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, SideNavComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})
export class ScheduleComponent {}
