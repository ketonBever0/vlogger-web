import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  Auth,
  AuthError,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseError } from 'firebase/app';
import { AuthService } from '../../../core/providers/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [MatInputModule, MatButton, ReactiveFormsModule, NgIf],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['testuser@example.me', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  private snackBar = inject(MatSnackBar);

  auth: Auth = inject(Auth);

  async onSubmit() {
    if (this.loginForm.valid) {
      const error = await this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
      if (error) this.snackBar.open(error, '', { duration: 3000 });
      else {
        this.snackBar.open('Welcome back!', '', { duration: 3000 });
        this.router.navigateByUrl('/home');
      }
    }
  }

  ngOnInit() {}
}
