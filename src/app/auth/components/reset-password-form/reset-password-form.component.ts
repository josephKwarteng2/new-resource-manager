import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  InputFields,
  ResetToggleService,
} from '../../services/reset-toggle.service';
import { passwordMatchValidator } from '../../validators/passwordmismatch';
import { passwordStrength } from '../../validators/passwordstrength';
import { Store } from '@ngrx/store';
import {
  ResetPasswordResponse,
  SendOtpResponse,
} from '../../types/reset-types';
import {
  selectError,
  selectResponse,
} from '../../store/reset-password/ResetReducers';
import { ResetActions } from '../../store/reset-password/ResetActions';
import {
  ResetPasswordRequest,
  ResetPasswordError,
} from '../../types/reset-types';
import { Subscription } from 'rxjs';
import { GlobalInputComponent } from '../../../shared/components/global-input/global-input.component';

@Component({
  selector: 'reset-password-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    GlobalInputComponent,
  ],
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css', '../../styles/styles.css'],
})
export class ResetPasswordFormComponent implements OnInit, OnDestroy {
  resetPasswordForm!: FormGroup;
  subscriptions: Subscription[] = [];
  nextFormField!: InputFields;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordStrength!: 'weak' | 'medium' | 'strong' | '';
  resBody!: ResetPasswordResponse | SendOtpResponse | null;
  successMessage!: string | undefined;
  errors!: ResetPasswordError;

  constructor(
    private resetToggleService: ResetToggleService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
        ]),
        password_confirmation: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      {
        validators: passwordMatchValidator('password', 'password_confirmation'),
      }
    );

    const storeSubscription$ = this.store.select(selectResponse).subscribe({
      next: res => {
        if ((res as ResetPasswordResponse).accessToken) {
          this.successMessage = res?.message;
        }
        this.resBody = res;
      },
      error: err => {
        this.errors.message = err;
      },
    });

    const errors$ = this.store.select(selectError).subscribe({
      next: res => {
        this.errors = res as ResetPasswordError;
      },
    });

    this.subscriptions.push(storeSubscription$, errors$);
  }

  get passwordField() {
    return this.showPassword ? 'text' : 'password';
  }

  get confirmPasswordField() {
    return this.showConfirmPassword ? 'text' : 'password';
  }

  getPasswordErrors() {
    const control = this.resetPasswordForm.get('password');
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError('required')) {
        return "Password can't be empty";
      } else if (control.hasError('pattern')) {
        return 'Password must have at least one uppercase, one lowercase and a number';
      } else if (control.hasError('minlength')) {
        return 'Password must be at least 8 characters';
      }
    }
    return '';
  }

  getConfirmPasswordErrors() {
    const control = this.resetPasswordForm;
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError('passwordMismatch')) {
        return 'Passwords do not match';
      }
    }

    const confirmPasswordControl = control.get('password_confirmation');
    if (
      confirmPasswordControl?.invalid &&
      (confirmPasswordControl.dirty || confirmPasswordControl.touched)
    ) {
      if (confirmPasswordControl.hasError('required')) {
        return "Confirm password can't be empty";
      }
    }

    return '';
  }

  updatePasswordStrength() {
    const passwordControl = this.resetPasswordForm.get('password');
    if (passwordControl?.errors?.['passwordStrength']) {
      this.passwordStrength = passwordControl.errors['passwordStrength'];
    } else {
      this.passwordStrength = 'strong';
    }
  }

  get cssClasses() {
    return {
      weak: this.passwordStrength === 'weak',
      medium: this.passwordStrength === 'medium',
      strong: this.passwordStrength === 'strong',
    };
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  submitForm(event: Event) {
    event.preventDefault();
    const credentials = this.resetPasswordForm.value;
    const otp = (this.resBody as SendOtpResponse).OTP;
    const email = (this.resBody as SendOtpResponse).user.email;

    const requestBody: ResetPasswordRequest = {
      ...credentials,
      otp,
      email,
    };

    if (this.resetPasswordForm.valid) {
      this.store.dispatch(ResetActions.resetPassword(requestBody));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
