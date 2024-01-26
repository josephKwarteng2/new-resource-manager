import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSideIllustrationComponent } from '../../../../auth/components/login-side-illustration/login-side-illustration.component';
import { validPhoneNumber } from '../../../../auth/validators/invalidphonenumber';
import {
  selectLogin,
  LoginState,
} from '../../../../auth/store/authorization/AuthReducers';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../auth/store/authorization/AuthActions';
import { Input } from '@angular/core';
import { GlobalInputComponent } from '../../../../shared/components/global-input/global-input.component';

@Component({
  selector: 'account-setup-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginSideIllustrationComponent,
    GlobalInputComponent,
  ],
  templateUrl: './account-setup-form.component.html',
  styleUrls: [
    './account-setup-form.component.css',
    '../../../../auth/styles/styles.css',
  ],
})
export class AccountSetupFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  userDetails!: FormGroup;

  imgUrl = '../../../../../assets/images/user/profile-container.svg';
  storeData!: LoginState;
  @Input() email!: string;
  @Input() userId!: string;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.userDetails = new FormGroup({
      profilePicture: new FormControl(null),
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'),
      ]),
      phoneNumber: new FormControl('', [Validators.required, validPhoneNumber]),
    });

    const storeSubscription = this.store.select(selectLogin).subscribe({
      next: res => {
        this.storeData = res;
      },
    });
    this.subscriptions.push(storeSubscription);
  }

  getEmailErrors(): string {
    const control = this.userDetails.get('email');
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError('required')) {
        return 'This field is required';
      } else if (control.hasError('email')) {
        return 'Please enter a valid email address';
      }
    }

    return '';
  }

  getNameErrors(name: 'firstName' | 'lastName') {
    const control = this.userDetails.get(name);
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError('required')) {
        return 'This field is required';
      } else if (control.hasError('pattern')) {
        return 'Name can only contain letters and one space per word';
      }
    }

    return '';
  }

  getNumberErrors() {
    const control = this.userDetails.get('phoneNumber');
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError('required')) {
        return 'This field is required';
      } else if (control.hasError('invalidPhoneNumber')) {
        return 'Number should be exactly 10 digits without country code';
      }
    }

    return '';
  }

  onFileChange(event: any) {
    if (event.target?.files.length > 0) {
      let reader = new FileReader();
      const file = event.target.files[0];

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      };

      this.userDetails.patchValue({
        profilePicture: file,
      });
    }
  }

  submitForm(event: Event) {
    event.preventDefault();
    const userDetails = this.userDetails.value;
    const userId = this.userId;

    if (this.userDetails.valid) {
      const reqBody = {
        ...userDetails,
        userId,
      };

      this.store.dispatch(AuthActions.updateUserDetails(reqBody));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
