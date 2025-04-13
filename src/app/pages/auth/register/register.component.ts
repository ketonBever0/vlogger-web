import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/providers/auth/auth.service';

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatProgressBarModule,
  ],
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  signupForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullname: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$#!%*?&]{8,}$/
          ),
        ],
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          (control: AbstractControl<any, any>) => {
            if (this.signupForm) {
              return this.signupForm.get('password')?.value === control.value
                ? null
                : { passwordMismatch: true };
            }
            return null;
          },
        ]),
      ],
    });

    this.signupForm.valueChanges.subscribe(() => {
      this.getProgressValue();
    });
  }

  progressValue = 0;
  getProgressValue() {
    this.progressValue =
      (Object.values(this.signupForm.controls).filter(
        (control) => control.valid
      ).length /
        Object.keys(this.signupForm.controls).length) *
      100;
  }

  submitError = false;
  private snackBar = inject(MatSnackBar);

  async onSubmit() {
    if (!this.signupForm.valid) {
      this.snackBar.open('You did not provide all required data.', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.signupForm.value.password != this.signupForm.value.confirmPassword
    ) {
      this.snackBar.open('Password and Confirm Password must match.', '', {
        duration: 3000,
      });
      return;
    }

    const error = await this.authService.register(this.signupForm);
    if (error) this.snackBar.open(error, '', { duration: 3000 });
    else {
      this.snackBar.open('Registration successful.', '', {
        duration: 3000,
      });
      this.router.navigateByUrl('/signin');
    };
  }
}
