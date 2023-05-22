import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';
import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  let fixture: ComponentFixture<SignupFormComponent>;
  let userService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupFormComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        NoopAnimationsModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    userService = fixture.debugElement.injector.get(UsersService);
    fixture.detectChanges();
  });

  it('should set default values for formControls', () => {
    const component = fixture.componentInstance;
    const { firstName, lastName, email, password } = component.signupForm.controls;

    expect(firstName.value).toBe('');
    expect(firstName.valid).toBe(false);
    expect(firstName.touched).toBe(false);

    expect(lastName.value).toBe('');
    expect(lastName.valid).toBe(false);
    expect(lastName.touched).toBe(false);

    expect(email.value).toBe('');
    expect(email.valid).toBe(false);
    expect(email.touched).toBe(false);

    expect(password.value).toBe('');
    expect(password.valid).toBe(false);
    expect(password.touched).toBe(false);
  });

  describe('humanizeErrors', () => {
    it('should return an array of string', () => {
      const component = fixture.componentInstance;
      const error = { hasUppercase: 'false' };
      const expected = ['This field should contain an uppercase letter'];
  
      expect(component.humanizeErrors(error)).toEqual(expected)
    });
  
    it('should return an empty array', () => {
      const component = fixture.componentInstance;
      const error = {};
  
      expect(component.humanizeErrors(error).length).toBe(0);
    });
  });

  describe('submitApplication', () => {
    it('should not call usersService.createUser', () => {
      const createUserSpy = spyOn(userService, 'createUser');
      const component = fixture.componentInstance;
      component.submitApplication();

      expect(createUserSpy).toHaveBeenCalledTimes(0);
    });

    it('should call usersService.createUser', () => {
      const createUserSpy = spyOn(userService, 'createUser');
      createUserSpy.and.returnValue(of({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }));
      const component = fixture.componentInstance;
      const { firstName, lastName, email, password } = component.signupForm.controls;

      firstName.setValue('Bruno');
      lastName.setValue('Queiros');
      email.setValue('valid@email.com');
      password.setValue('ASDFGhjkl');

      component.submitApplication();

      expect(createUserSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Validation', () => {
    describe('firstName', () => {
      it('should be invalid (empty)', () => {
        const component = fixture.componentInstance;
        const { firstName } = component.signupForm.controls;
        const input = fixture.debugElement.query(By.css('[data-testid="signup-first-name"]')).nativeElement;

        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        expect(firstName.value).toBe('');
        expect(firstName.valid).toBe(false);
        expect(firstName.touched).toBe(true);
      });

      it('should be valid', () => {
        const component = fixture.componentInstance;
        const { firstName } = component.signupForm.controls;
        const input = fixture.debugElement.query(By.css('[data-testid="signup-first-name"]')).nativeElement;

        input.value = 'Bruno';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        expect(firstName.value).toBe('Bruno');
        expect(firstName.valid).toBe(true);
      });
    });

    describe('lastName', () => {
      it('should be invalid (empty)', () => {
        const component = fixture.componentInstance;
        const { lastName } = component.signupForm.controls;
        const input = fixture.debugElement.query(By.css('[data-testid="signup-last-name"]')).nativeElement;

        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        expect(lastName.value).toBe('');
        expect(lastName.valid).toBe(false);
        expect(lastName.touched).toBe(true);
      });

      it('should be valid', () => {
        const component = fixture.componentInstance;
        const { lastName } = component.signupForm.controls;
        const input = fixture.debugElement.query(By.css('[data-testid="signup-last-name"]')).nativeElement;

        input.value = 'Bruno';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        expect(lastName.value).toBe('Bruno');
        expect(lastName.valid).toBe(true);
      });
    });

    describe('email', () => {
      it('should be invalid (empty)', () => {
        const component = fixture.componentInstance;
        const { email } = component.signupForm.controls;
        const input = fixture.debugElement.query(By.css('[data-testid="signup-email"]')).nativeElement;

        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        expect(email.value).toBe('');
        expect(email.valid).toBe(false);
        expect(email.touched).toBe(true);
      });

      it('should be invalid (email)', () => {
        const component = fixture.componentInstance;
        const { email } = component.signupForm.controls;
        const input = fixture.debugElement.query(By.css('[data-testid="signup-email"]')).nativeElement;

        input.value = 'wrong-email';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        expect(email.value).toBe('wrong-email');
        expect(email.valid).toBe(false);
        expect(email.errors).toEqual({ email: true });
      });

      it('should be valid', () => {
        const component = fixture.componentInstance;
        const { email } = component.signupForm.controls;
        const input = fixture.debugElement.query(By.css('[data-testid="signup-email"]')).nativeElement;

        input.value = 'correct@email.com';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        expect(email.value).toBe('correct@email.com');
        expect(email.valid).toBe(true);
      });
    });

    describe('password', () => {
      it('should be invalid (empty)', () => {
        const component = fixture.componentInstance;
        const { password } = component.signupForm.controls;
        const input = fixture.debugElement.query(By.css('[data-testid="signup-password"]')).nativeElement;

        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        expect(password.value).toBe('');
        expect(password.valid).toBe(false);
        expect(password.touched).toBe(true);
      });

      it('should be invalid (minlength)', () => {
        const component = fixture.componentInstance;
        const { password } = component.signupForm.controls;
        const input = fixture.debugElement.query(By.css('[data-testid="signup-password"]')).nativeElement;

        input.value = 'Asd';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        expect(password.value).toBe('Asd');
        expect(password.valid).toBe(false);
        expect(password.errors).toEqual({
          minlength: {
            requiredLength: 8,
            actualLength: 3
          }
        });
      });

      it('should be invalid (hasUppercase)', () => {
        const component = fixture.componentInstance;
        const { password } = component.signupForm.controls;
        const input = fixture.debugElement.query(By.css('[data-testid="signup-password"]')).nativeElement;

        input.value = 'asdfghjkl';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        expect(password.value).toBe('asdfghjkl');
        expect(password.valid).toBe(false);
        expect(password.errors).toEqual({
          hasUppercase: false
        });
      });

      it('should be invalid (hasLowercase)', () => {
        const component = fixture.componentInstance;
        const { password } = component.signupForm.controls;
        const input = fixture.debugElement.query(By.css('[data-testid="signup-password"]')).nativeElement;

        input.value = 'ASDFGHJKL';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        expect(password.value).toBe('ASDFGHJKL');
        expect(password.valid).toBe(false);
        expect(password.errors).toEqual({
          hasLowercase: false
        });
      });

      it('should be invalid (forbiddenName)', () => {
        const component = fixture.componentInstance;
        const { firstName, lastName, password } = component.signupForm.controls;
        const input = fixture.debugElement.query(By.css('[data-testid="signup-password"]')).nativeElement;

        firstName.setValue('Bruno');
        lastName.setValue('Queiros');
        input.value = 'BrunoQueiros';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        expect(password.value).toBe('BrunoQueiros');
        expect(password.valid).toBe(false);
        expect(password.errors).toEqual({
          forbiddenName: {
            value: 'BrunoQueiros'
          }
        });
      });

      it('should be valid', () => {
        const component = fixture.componentInstance;
        const { password } = component.signupForm.controls;
        const input = fixture.debugElement.query(By.css('[data-testid="signup-password"]')).nativeElement;

        input.value = 'asdfgHJKL';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        expect(password.value).toBe('asdfgHJKL');
        expect(password.valid).toBe(true);
        expect(password.errors).toEqual(null);
      });
    });
  });
});