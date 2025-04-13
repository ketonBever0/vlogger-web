import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthError, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { User } from '../../models/User';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    this.checkAuthState();
  }

  userData: User | null = null;
  isAuthenticated = false;
  private fAuth = inject(Auth);
  fStore = inject(Firestore);

  async checkAuthState() {
    onAuthStateChanged(this.fAuth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(this.fStore, 'users', user.uid));
        this.userData = userDoc.data() as User;
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  async register(form: FormGroup): Promise<string | null> {
    let error: string | null = null;
    await createUserWithEmailAndPassword(this.fAuth, form.value.email, form.value.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log('User registered successfully:', user);

          if (userCredential)
            addDoc(collection(this.fStore, 'users'), {
              id: userCredential.user?.uid,
              email: userCredential.user?.email,
              fullname: form.value.fullname,
              mobile: '',
              createdAt: new Date(),
              updatedAt: new Date(),
              role: 'user',
            });
        })
        .catch((e: AuthError) => {
          if(e.code === 'auth/email-already-in-use') {
            error = 'Email already in use!';
          }
        });
        return error;
  }

  async login(email: string, password: string) {
    let error: string | null = null;
    await signInWithEmailAndPassword(
      this.fAuth,
      email,
      password
    ).catch((e: AuthError) => {
      console.log(e.message);
      if (e.message.includes('auth/invalid-credential')) {
        error = 'Wrong credentials!';
      } else if (e.message.includes('auth/too-many-requests)')) {
        error = 'Too many requests. Please try again later.';
      }
    });

    if (error) return error;
    else return null;
  }

  async logout() {
    try {
      return await this.fAuth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  }
}
