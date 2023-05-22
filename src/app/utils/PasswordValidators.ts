import { ValidationErrors, AbstractControl } from '@angular/forms';

export class PasswordValidators {
  static hasUppercase(control: AbstractControl): ValidationErrors | null {
    const valid = /[A-Z]/.test(control.value);
    return valid ? null : { hasUppercase: false };
  }

  static hasLowercase(control: AbstractControl): ValidationErrors | null {
    const valid = /[a-z]/.test(control.value);
    return valid ? null : { hasLowercase: false };
  }

  static forbiddenName(control: AbstractControl): ValidationErrors | null {
    const formValues = control.parent?.getRawValue();

    if (!formValues) return null;

    const { firstName, lastName } = formValues;

    if (firstName === '' || lastName === '') return null;

    const forbidden = new RegExp(`${firstName}|${lastName}`, 'i').test(control.value);
    return forbidden ? { forbiddenName: { value: control.value }} : null;
  }
}