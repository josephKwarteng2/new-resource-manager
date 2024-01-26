import { Route } from '@angular/router';
import { DashboardComponent } from '../admin/pages/dashboard/dashboard.component';
import { AccountSetupComponent } from '../admin/pages/account-setup/account-setup.component';
import { UsercreationComponent } from '../admin/pages/usercreation/usercreation.component';
import { UsersComponent } from '../admin/pages/users/users.component';
import { MainComponent } from '../admin/main.component';
import { SettingsComponent } from '../admin/pages/settings/settings.component';
import { ClientComponent } from '../admin/pages/client/client.component';
import { ProjectComponent } from '../admin/pages/project/project.component';
import { ScheduleComponent } from '../admin/pages/schedule/schedule.component';
import { MessageComponent } from '../admin/pages/message/message.component';

export const AdminRoutes: Route[] = [
  {
    path: 'account-setup',
    component: AccountSetupComponent,
  },
  {
    path: 'create-user',
    component: UsercreationComponent,
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },

      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'client',
        component: ClientComponent,
      },
      {
        path: 'project',
        component: ProjectComponent,
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
      },
      {
        path: 'message',
        component: MessageComponent,
      },
    ],
  },
];
