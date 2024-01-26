import { ValidationErrors, AbstractControl } from '@angular/forms';

export function passwordStrength(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  const hasUpperCase = /[A-Z]/.test(value);
  const hasSymbol = /[!@#$%^&*]/.test(value);

  if (!hasUpperCase && !hasSymbol) {
    return { passwordStrength: 'weak' };
  } else if (hasUpperCase && !hasSymbol) {
    return { passwordStrength: 'medium' };
  } else if (hasUpperCase && hasSymbol) {
    return null;
  }

  return { passwordStrength: 'weak' };
}
