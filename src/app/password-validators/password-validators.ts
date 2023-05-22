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
    const firstName = control.parent?.get('firstName')?.value;
    const lastName = control.parent?.get('lastName')?.value;
    const hasFirstName = firstName ? new RegExp(firstName, 'i').test(control.value) : false;
    const hasLastName = lastName ? new RegExp(lastName, 'i').test(control.value) : false;
    const forbidden = hasFirstName || hasLastName;

    return forbidden ? { forbiddenName: true } : null;
  }
}
