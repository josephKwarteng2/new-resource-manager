import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Custom Validation for checking if a phone number is exactly 10 digits long
 * @param control Base class for FormControl, FormGroup and FormArray
 * @returns {ValidationErrors | null} invalidPhoneNumber if there is an error
 */

export function validPhoneNumber(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  const isValid = /^[0-9]{10}$/.test(value);

  return isValid ? null : { invalidPhoneNumber: true };
}
