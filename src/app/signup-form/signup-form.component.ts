import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { UsersService } from 'src/app/users/users.service';
import { PasswordValidators } from 'src/app/password-validators/password-validators';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
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

  clearForm() {
    this.signupForm.reset();
    Object.keys(this.signupForm.controls).forEach(control => {
      this.signupForm.get(control)?.setErrors(null) ;
    });
  }

  openSnackBar() {
    this._snackBar.open('🎉 User created', '', {
      duration: 3000,
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
          this.clearForm();
          this.openSnackBar();
        }
      })
    }
  }
}
