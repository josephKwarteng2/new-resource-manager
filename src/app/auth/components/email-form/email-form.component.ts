import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ResetActions } from '../../store/reset-password/ResetActions';
import { combineLatest, Subscription } from 'rxjs';
import { ResetState, SendOtpError } from '../../types/reset-types';
import {
  selectIsSubmitting,
  selectError,
  selectResponse,
} from '../../store/reset-password/ResetReducers';
import { GlobalInputComponent } from '../../../shared/components/global-input/global-input.component';

@Component({
  selector: 'email-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    GlobalInputComponent,
  ],
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css', '../../styles/styles.css'],
})
export class EmailFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  emailForm!: FormGroup;
  successMessage: string | null = null;
  storeData: Pick<ResetState, 'error' | 'isSubmitting' | 'response'> = {
    error: null,
    isSubmitting: false,
    response: null,
  };
  storeData$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    error: this.store.select(selectError),
    response: this.store.select(selectResponse),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    const storeSubscription = this.storeData$.subscribe({
      next: res => {
        if (res.error) {
          this.storeData.error = res.error;
        }
        this.storeData.isSubmitting = res.isSubmitting;
        if (res.response) {
          this.storeData.response = res.response;
        }
      },

      error: (err: SendOtpError) => {
        this.storeData.error = err;
      },
    });

    this.subscriptions.push(storeSubscription);
  }

  getEmailErrors(): string {
    const control = this.emailForm.get('email');
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError('required')) {
        return 'This field is required';
      } else if (control.hasError('email')) {
        return 'Please enter a valid email address';
      }
    }

    return '';
  }

  submitForm(event: Event) {
    event.preventDefault();
    if (this.emailForm.valid) {
      const email = this.emailForm.value;
      this.store.dispatch(ResetActions.sendOtp(email));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
