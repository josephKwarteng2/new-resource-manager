import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { UserGroupComponent } from './pages/user-group/user-group.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ProjectComponent } from './pages/project/project.component';
import { SettingComponent } from './pages/setting/setting.component';
import { MessageComponent } from './pages/message/message.component';
import { MainComponent } from './main.component';

export const UserRoutes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      { path: 'users', component: UsersComponent },
      {
        path: 'client',
        component: UserGroupComponent,
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
      },
      {
        path: 'project',
        component: ProjectComponent,
      },
      {
        path: 'settings',
        component: SettingComponent,
      },
      {
        path: 'message',
        component: MessageComponent,
      },
    ],
  },
];
