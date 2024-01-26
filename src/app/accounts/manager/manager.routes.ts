import { Route } from '@angular/router';
import { SettingsComponent } from '../manager/pages/settings/settings.component';
import { DashboardComponent } from '../manager/pages/dashboard/dashboard.component';
import { MainComponent } from '../manager/main.component';
import { UsersComponent } from '../manager/pages/users/users.component';
import { ClientComponent } from '../manager/pages/client/client.component';
import { MessageComponent } from '../manager/pages/message/message.component';
import { ProjectComponent } from '../manager/pages/project/project.component';
import { ScheduleComponent } from '../manager/pages/schedule/schedule.component';

export const ManagerRoutes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'client',
        component: ClientComponent,
      },
      {
        path: 'message',
        component: MessageComponent,
      },
      {
        path: 'project',
        component: ProjectComponent,
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
      },
    ],
  },
];
