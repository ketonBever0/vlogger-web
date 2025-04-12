import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Auth, AuthError, signInWithEmailAndPassword } from '@angular/fire/auth';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [MatInputModule, MatButton, ReactiveFormsModule, NgIf],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['testuser@example.me', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  private snackBar = inject(MatSnackBar);

  auth: Auth = inject(Auth);

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      await signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log('User signed in:', user);
          // You can redirect the user or perform other actions here
        })
        .catch((e: FirebaseError) => {
          console.log(e.message);
          if (e.message.includes('auth/invalid-credential')) {
            this.snackBar.open('Wrong credentials!', '', { duration: 3000 });
          }
          else if(e.message.includes('auth/too-many-requests)')) {
            this.snackBar.open('Too many requests. Please try again later.', '', { duration: 3000 });
          }
        });
    } else {
      console.log('Form is invalid');
    }
  }

  ngOnInit() {}
}
