import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ForgotPasswordComponent } from './auth/pages/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/accounts/accounts.routes').then(m => m.AccountRoutes),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];
