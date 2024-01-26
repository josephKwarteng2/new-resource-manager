import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';
import { validPhoneNumber } from '../../../../auth/validators/invalidphonenumber';
import { selectCurrentUser } from '../../../../auth/store/authorization/AuthReducers';
import { Store } from '@ngrx/store';
import {
  CurrentUser,
  Departments,
  InitialSig,
  Specializations,
} from '../../../../shared/types/types';

@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: [
    './user-profile.component.css',
    '../../pages/setting/setting.component.css',
  ],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  userDetails!: FormGroup;
  imgUrl = '../../../../../assets/images/user/profile-container-2.svg';
  user!: CurrentUser;
  disable: boolean = false;
  settingsSig = signal<InitialSig>({
    success: null,
    error: null,
    pending: false,
  });
  specializations!: Specializations[];
  departments!: Departments[];

  constructor(private store: Store, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.userDetails = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      profilePicture: new FormControl(null),
      email: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
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

    const storeSub = this.store.select(selectCurrentUser).subscribe({
      next: user => {
        if (user) {
          this.user = user;
        }
        this.setValues();
      },
    });

    this.subscriptions.push(storeSub);
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

  // write types for the names and call it here
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

  /**
   * This method is used to change the image url when the user selects a file
   * @param event
   * @returns {void}
   */
  onFileChange(event: any) {
    if (event.target?.files.length > 0) {
      let reader = new FileReader();
      const file = event.target.files[0];

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      };
    }
  }

  setValues() {
    if (this.user) {
      this.userDetails.patchValue({
        userId: this.user.userId,
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phoneNumber: this.user.phoneNumber,
        imgUrl: this.user.profilePicture,
      });
    }
  }

  get signalValues() {
    const val = this.settingsSig();
    return val;
  }

  /**
   * The form is submitted here
   * @param event
   * @returns {void}
   */
  submitForm(event: Event) {
    event.preventDefault();
    this.settingsSig.set({
      success: null,
      error: null,
      pending: true,
    });

    if (!this.user) {
      console.error('User details not available.');
      return;
    }

    const { firstName, lastName, phoneNumber } = this.userDetails.value;
    const reqBody = {
      userId: this.user.userId,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
    };

    if (this.userDetails.valid) {
      this.settingsService.updateDetails(reqBody).subscribe({
        next: response => {
          if (response && response.message) {
            this.settingsSig.set({
              success: response,
              error: null,
              pending: false,
            });
            setTimeout(() => {
              this.settingsSig.set({
                success: null,
                error: null,
                pending: false,
              });
            }, 3000);
          }
        },
        error: error => {
          this.settingsSig.set({
            success: null,
            error: error.errors,
            pending: false,
          });

          setTimeout(() => {
            this.settingsSig.set({
              success: null,
              error: null,
              pending: false,
            });
          }, 3000);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
