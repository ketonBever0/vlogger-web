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
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseError } from 'firebase/app';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection } from 'firebase/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder // private readonly authService: AngularFireAuth,
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

  auth: Auth = inject(Auth);
  firestore: Firestore = inject(Firestore);

  async onSubmit() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;

      await createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log('User registered successfully:', user);

          if (userCredential)
            addDoc(collection(this.firestore, 'users'), {
              id: userCredential.user?.uid,
              email: userCredential.user?.email,
              fullname: this.signupForm.value.fullname,
              mobile: 'nope',
              createdAt: new Date(),
              updatedAt: new Date(),
              role: 'user',
            });
        })
        .catch((error: FirebaseError) => {
          console.error('Error registering user:', error);
        });
    } else {
      this.submitError = true;
      // Optionally, you can mark all fields as touched to show validation errors
      Object.keys(this.signupForm.controls).forEach((field) => {
        const control = this.signupForm.get(field);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  ngOnInit(): void {}
}
