import { JSONObject } from 'src/app/types/shared.types';

const ERROS_MAP: JSONObject = {
  required: 'This field is required',
  email: 'This field should be a valid email',
  hasUppercase: 'This field should contain an uppercase letter',
  hasLowercase: 'This field should contain a lowercase letter',
  forbiddenName: 'You cannot use your first name or last name',
  minlength: 'This field should have at least [requiredLength] letters',
};

const humanizeErrors = (errors: JSONObject): string[] => {
  return Object.keys(errors).map(errorKey => {
    let errorString = ERROS_MAP[errorKey];
    const error = errors[errorKey] as unknown as JSONObject;
    const errorKeys = Object.keys(error);

    errorKeys.forEach(errorKey => {
      errorString = errorString.replace(`[${errorKey}]`, error[errorKey]);
    });

    return errorString;
  });
}

export default humanizeErrors;
