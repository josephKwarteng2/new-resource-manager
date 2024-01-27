import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  AbstractControl,
  FormControl,
} from '@angular/forms';
@Component({
  selector: 'global-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './global-input.component.html',
  styleUrl: './global-input.component.css',
})
export class GlobalInputComponent implements OnInit {
  @Input() id: string = '';
  @Input() type: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() globalClass: string = '';
  @Input() control: FormControl | AbstractControl | any;
  @Input() label: string = '';
  @Input() required: boolean = false;
  // @Input() disabled: boolean = false;
  @Input() class: string = '';
  @Input() onClick: () => void = () => {};
  @Input() errorType: string = 'required';
  @Input() errorMessage: string = 'Field is required';
  @Input() showPassword: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.control) {
      this.control.valueChanges.subscribe((value: string) => {
        this.value;
      });
    }
  }

  showErrorMessage(): boolean {
    if (this.control) {
      return this.control.hasError(this.errorType) && this.control.dirty;
    }
    return false;
  }

  classError(): string {
    if (this.control) {
      return this.control.hasError(this.errorType) && this.control.dirty
        ? 'error'
        : '';
    }
    return '';
  }

  // getEmailErrors(): string {
  //   const control = this.control;

  //   if (control?.invalid && (control.dirty || control.touched)) {
  //     if (control.hasError('required')) {
  //       return 'This field is required';
  //     } else if (control.hasError('email')) {
  //       return 'Please enter a valid email address';
  //     }
  //   }

  //   return this.errorMessage;
  // }
}
