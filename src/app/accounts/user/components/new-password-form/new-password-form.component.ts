import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AccountSetupService,
  SetupProgress,
} from '../../services/account-setup.service';
import { passwordMatchValidator } from '../../../../auth/validators/passwordmismatch';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../auth/store/authorization/AuthActions';
import {
  UserPasswordState,
  selectUpdateUserPassword,
} from '../../../../auth/store/authorization/AuthReducers';
import { Subscription } from 'rxjs';
import { GlobalInputComponent } from '../../../../shared/components/global-input/global-input.component';

@Component({
  selector: 'new-password-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GlobalInputComponent],
  templateUrl: './new-password-form.component.html',
  styleUrls: [
    './new-password-form.component.css',
    '../../../../auth/styles/styles.css',
  ],
})
export class NewPasswordFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  setNewPasswordForm!: FormGroup;
  setupProgress!: SetupProgress;
  @Input() userDetails!: {
    accessToken: string;
    email: string;
    userId: string;
  };
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordStrength!: 'weak' | 'medium' | 'strong' | '';
  storeData!: UserPasswordState;
  storeData$ = this.store.select(selectUpdateUserPassword);

  constructor(
    private setupService: AccountSetupService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.setNewPasswordForm = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
        ]),
        password_confirmation: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
        ]),
      },
      {
        validators: passwordMatchValidator('password', 'password_confirmation'),
      }
    );

    const storeSubscription = this.storeData$.subscribe({
      next: res => {
        this.storeData = res;
      },
      error: err => {
        this.storeData.error = err;
      },
    });
    this.subscriptions.push(storeSubscription);
  }

  get passwordField() {
    return this.showPassword ? 'text' : 'password';
  }

  get confirmPasswordField() {
    return this.showConfirmPassword ? 'text' : 'password';
  }

  getPasswordErrors() {
    const control = this.setNewPasswordForm.get('password');
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError('required')) {
        return "Password can't be empty";
      } else if (control.hasError('required')) {
        return 'Password must have at least one uppercase, one lowercase and a number';
      } else if (control.hasError('minlength')) {
        return 'Password must be at least 8 characters';
      }
    }

    return '';
  }

  getConfirmPasswordErrors() {
    const control = this.setNewPasswordForm;
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
    const passwordControl = this.setNewPasswordForm.get('password');
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

  submitForm(event: Event) {
    event.preventDefault();
    const credentials = this.setNewPasswordForm.value;
    const { email, userId } = this.userDetails;

    if (this.setNewPasswordForm.valid === true) {
      const reqBody = {
        ...credentials,
        email,
        userId,
      };

      this.store.dispatch(AuthActions.updateUserPassword(reqBody));
    } else {
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
