import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { SideNavComponent } from '../../../../shared/components/side-nav/side-nav.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import {
  SettingsFields,
  SettingsService,
} from '../../../user/services/settings.service';
import { UserPasswordComponent } from '../../../user/components/user-password/user-password.component';
import { Subscription } from 'rxjs';
import { WorkSpecializationComponent } from '../../components/work-specialization/work-specialization.component';
import { AdminProfileComponent } from '../../components/admin-profile/admin-profile.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    SideNavComponent,
    HeaderComponent,
    AdminProfileComponent,
    UserPasswordComponent,
    WorkSpecializationComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnDestroy {
  subscriptions: Subscription[] = [];
  settingsField: SettingsFields = 'profile';

  constructor(private settingsService: SettingsService) {
    const settingsSub = this.settingsService.data.subscribe({
      next: field => {
        this.settingsField = field;
      },
    });
    this.subscriptions.push(settingsSub);
  }

  changeField($event: Event, field: SettingsFields) {
    this.settingsService.toggle(field);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
