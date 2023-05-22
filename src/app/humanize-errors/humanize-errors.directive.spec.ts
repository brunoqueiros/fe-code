import { HumanizeErrorsDirective } from './humanize-errors.directive';

describe('HumanizeErrorsDirective', () => {
  let directive: HumanizeErrorsDirective;

  beforeEach(() => {
    directive = new HumanizeErrorsDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should humanize errors', () => {
    const errors = {
      required: true,
      email: true,
      hasUppercase: true,
      hasLowercase: true,
      forbiddenName: true,
      minlength: {
        actualLength: 3,
        requiredLength: 8
      },
    };
    const expected = [
      'This field is required',
      'This field should be a valid email',
      'This field should contain an uppercase letter',
      'This field should contain a lowercase letter',
      'You cannot use your first name or last name',
      'This field should have at least 8 letters'
    ];
    directive.appHumanizeErrors = errors;

    expect(directive.errors).toEqual(expected);
  });

  it('should return an empty array', () => {
    const errors = null;
    const expected: string[] = [];
    directive.appHumanizeErrors = errors;

    expect(directive.errors).toEqual(expected);
  });
});
