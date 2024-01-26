import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom Validation for checking if password and confirm password fields match
 * @param control Base class for FormControl, FormGroup and FormArray
 * @returns {ValidationErrors | null} passwordMismatch if there is an error
 */

export function passwordMatchValidator(
  passwordField: string,
  confirmPasswordField: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordField);
    const confirmPassword = control.get(confirmPasswordField);

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  };
}
