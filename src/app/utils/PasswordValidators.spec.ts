import { FormControl, FormGroup } from '@angular/forms';
import { PasswordValidators } from './PasswordValidators';

describe('PasswordValidators', () => {
  describe('hasLowercase', () => {
    it('should return null', () => {
      const control = new FormControl('hello');
      expect(PasswordValidators.hasLowercase(control)).toBe(null);
    });
  
    it('should return an error', () => {
      const control = new FormControl('HELLO');
      expect(PasswordValidators.hasLowercase(control)).toEqual({ hasLowercase: false });
    });
  });

  describe('hasUppercase', () => {
    it('should return null', () => {
      const control = new FormControl('HELLO');
      expect(PasswordValidators.hasUppercase(control)).toBe(null);
    });
  
    it('should return an error', () => {
      const control = new FormControl('hello');
      expect(PasswordValidators.hasUppercase(control)).toEqual({ hasUppercase: false });
    });
  });

  describe('forbiddenName', () => {
    it('should return null', () => {
      const signupForm = new FormGroup({
        firstName: new FormControl('bruno'),
        lastName: new FormControl('queiros'),
        password: new FormControl('123456'),
      });
      expect(PasswordValidators.forbiddenName(signupForm.controls.password)).toBe(null);
    });
  
    it('should return an error', () => {
      const signupForm = new FormGroup({
        firstName: new FormControl('bruno'),
        lastName: new FormControl('queiros'),
        password: new FormControl('bruno'),
      });
      expect(PasswordValidators.forbiddenName(signupForm.controls.password)).toEqual({ forbiddenName: { value: 'bruno' } });
    });
  
    it('should return an error', () => {
      const signupForm = new FormGroup({
        firstName: new FormControl('bruno'),
        lastName: new FormControl('queiros'),
        password: new FormControl('queiros'),
      });
      expect(PasswordValidators.forbiddenName(signupForm.controls.password)).toEqual({ forbiddenName: { value: 'queiros' } });
    });
  });
});
