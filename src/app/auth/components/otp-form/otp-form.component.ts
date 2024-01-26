import {
  Component,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  InputFields,
  ResetToggleService,
} from '../../services/reset-toggle.service';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { SendOtpResponse } from '../../types/reset-types';
import { selectResponse } from '../../store/reset-password/ResetReducers';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'otp-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgOtpInputModule, FormsModule],
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.css', '../../styles/styles.css'],
})
export class OtpFormComponent implements OnDestroy {
  nextFormField!: InputFields;
  resBody!: SendOtpResponse;
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  @Input() numberOfBoxes = 6;
  @Output() otpChange = new EventEmitter<string>();
  @ViewChild('otpInput') otpInput!: ElementRef;
  otpValues: string[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  otp: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  storeSubscription = this.store.select(selectResponse).subscribe({
    next: res => {
      this.resBody = res as SendOtpResponse;
    },
    error: err => {},
  });

  constructor(
    private resetToggleService: ResetToggleService,
    private store: Store
  ) {}

  ngAfterViewInit() {
    this.setFocus(0);
  }

  private setFocus(index: number) {
    const inputIndex = Math.min(index, this.numberOfBoxes - 1);
    const input = this.otpInputs.toArray()[inputIndex].nativeElement;
    input.focus();
  }

  private emitOtp() {
    const concatenatedValue = this.otpValues.join('');
    this.otpChange.emit(concatenatedValue);
  }

  submitForm() {
    const otp = Number(this.otp?.value);
    if (otp === this.resBody.OTP) {
      this.successMessage = 'Valid OTP. Redirecting to the next step...';
      setTimeout(() => {
        this.nextFormField = 'changePassword';
        this.resetToggleService.toggle(this.nextFormField);
        this.errorMessage = '';
      }, 3000);
    } else {
      if (this.resBody.OTP !== undefined) {
        this.errorMessage = 'Invalid OTP. OTP Mismatch';
      } else {
        this.errorMessage = 'Invalid OTP';
      }

      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
