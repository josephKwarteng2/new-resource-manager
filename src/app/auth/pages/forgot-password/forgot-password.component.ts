import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginSideIllustrationComponent } from '../../components/login-side-illustration/login-side-illustration.component';
import { CommonModule } from '@angular/common';
import { EmailFormComponent } from '../../components/email-form/email-form.component';
import { RouterLink } from '@angular/router';
import {
  InputFields,
  ResetToggleService,
} from '../../../auth/services/reset-toggle.service';
import { OtpFormComponent } from '../../components/otp-form/otp-form.component';
import { ResetPasswordFormComponent } from '../../components/reset-password-form/reset-password-form.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    LoginSideIllustrationComponent,
    EmailFormComponent,
    OtpFormComponent,
    ResetPasswordFormComponent,
    RouterLink,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css', '../../styles/styles.css'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  formField: InputFields = 'email';
  successMessage: string | null = null;

  constructor(private resetToggleService: ResetToggleService) {}

  ngOnInit(): void {
    const toggSubscription = this.resetToggleService.data.subscribe({
      next: data => {
        this.formField = data;
      },
    });

    this.subscriptions.push(toggSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
