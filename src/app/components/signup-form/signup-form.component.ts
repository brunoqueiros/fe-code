import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { UsersService } from 'src/app/services/users/users.service';
import { PasswordValidators } from 'src/app/utils/PasswordValidators';

interface JSONObject { [x: string]: string }

const ERROS_MAP: JSONObject = {
  required: 'This field is required',
  email: 'This field should be a valid email',
  hasUppercase: 'This field should contain an uppercase letter',
  hasLowercase: 'This field should contain a lowercase letter',
  forbiddenName: 'You cannot use your first name or last name',
  minlength: 'This field should have at least 8 letters',
}

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  signupForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      PasswordValidators.hasUppercase,
      PasswordValidators.hasLowercase,
      PasswordValidators.forbiddenName
    ])
  });

  constructor(private _snackBar: MatSnackBar, private usersService: UsersService) {}

  humanizeErrors(errors: JSONObject): string[] {
    return Object.keys(errors).map(errorKey => {
      let errorString = ERROS_MAP[errorKey];
      const error = errors[errorKey] as unknown as JSONObject;
      const errorKeys = Object.keys(error);

      errorKeys.forEach(k => {
        errorString = errorString.replace(k, error[k]);
      });

      return errorString;
    });
  }

  submitApplication() {
    const { firstName, lastName, email, password } = this.signupForm.value;

    if (firstName && lastName && email && password) {
      this.usersService.createUser({
        firstName,
        lastName,
        email,
        password,
      })
      .subscribe(user => {
        if (user !== null) {
          this.signupForm.reset();
          Object.keys(this.signupForm.controls).forEach(control => {
            this.signupForm.get(control)?.setErrors(null) ;
          });

          this._snackBar.open('🎉 User created', '', {
            duration: 3000,
          });
        }
      })
    }
  }
}
