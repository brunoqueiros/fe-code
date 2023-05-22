import { Directive, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { JSONObject } from 'src/app/types/shared.types';

const ERROS_MAP: JSONObject = {
  required: 'This field is required',
  email: 'This field should be a valid email',
  hasUppercase: 'This field should contain an uppercase letter',
  hasLowercase: 'This field should contain a lowercase letter',
  forbiddenName: 'You cannot use your first name or last name',
  minlength: 'This field should have at least [requiredLength] letters',
};

@Directive({
  selector: '[appHumanizeErrors]',
  exportAs: 'appHumanizeErrors',
})
export class HumanizeErrorsDirective {
  constructor() {}

  errors: string[] = [];

  humanizeErrors = (errors: JSONObject): string[] => {
    console.log(errors)
    return Object.keys(errors).map(errorKey => {
      let errorString = ERROS_MAP[errorKey];
      const error = errors[errorKey] as unknown as JSONObject;
      const errorKeys = Object.keys(error);
  
      errorKeys.forEach(k => {
        errorString = errorString.replace(`[${k}]`, error[k]);
      });
  
      return errorString;
    });
  };

  @Input() set appHumanizeErrors(errors: ValidationErrors | null) {
    if (errors === null) return;

    this.errors = this.humanizeErrors(errors);
  };
}
