import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SideNavComponent } from '../../../../shared/components/side-nav/side-nav.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { UserPasswordComponent } from '../../components/user-password/user-password.component';
import {
  SettingsFields,
  SettingsService,
} from '../../services/settings.service';
import { Subscription } from 'rxjs';
import { WorkSpecializationComponent } from '../../components/work-specialization/work-specialization.component';

@Component({
  selector: 'setting',
  standalone: true,
  imports: [
    CommonModule,
    SideNavComponent,
    HeaderComponent,
    UserProfileComponent,
    UserPasswordComponent,
    WorkSpecializationComponent,
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  settingsField: SettingsFields = 'profile';

  constructor(private settingService: SettingsService) {}

  ngOnInit(): void {
    const settingsSub = this.settingService.data.subscribe({
      next: field => {
        this.settingsField = field;
      },
    });
    this.subscriptions.push(settingsSub);
  }

  changeField($event: Event, field: SettingsFields) {
    $event.preventDefault();
    this.settingService.toggle(field);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
