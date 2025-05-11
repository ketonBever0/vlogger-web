import { Injectable, OnDestroy } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  AuthError,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, onSnapshot, setDoc } from '@angular/fire/firestore';
import { User } from '../../models/User';
import { FormGroup } from '@angular/forms';
import { StoreService } from '../store/store.service';
import { distinctUntilChanged, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  constructor(
    public readonly fAuth: Auth,
    private readonly fStore: StoreService
  ) {
    this.getAuthState();
  }

  userData: User | null = null;
  isAuthenticated = false;

  private authSubscription?: Subscription;
  private userDocUnsubscribe?: () => void;

  getAuthState() {
    this.authSubscription = authState(this.fAuth)
      .pipe(distinctUntilChanged())
      .subscribe((user) => {
        if (this.userDocUnsubscribe) {
          this.userDocUnsubscribe();
          this.userDocUnsubscribe = undefined;
        }

        this.isAuthenticated = !!user;

        if (user) {
          this.userData = {
            id: user.uid,
          } as User;

          const docRef = doc(this.fStore.db, 'users', user.uid);
          this.userDocUnsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
              this.userData = {
                ...this.userData,
                ...docSnap.data(),
              } as User;
            }
          });
        } else {
          this.userData = null;
        }
      });
  }

  ngOnDestroy() {
    if (this.authSubscription) this.authSubscription.unsubscribe();
    if (this.userDocUnsubscribe) this.userDocUnsubscribe();
  }

  async register(form: FormGroup): Promise<string | null> {
    let error: string | null = null;
    await createUserWithEmailAndPassword(
      this.fAuth,
      form.value.email,
      form.value.password
    )
      .then((userCredential) => {
        if (userCredential.user)
          setDoc(doc(this.fStore.db, 'users', userCredential.user!.uid), {
            email: userCredential.user?.email,
            fullname: form.value.fullname,
            mobile: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            role: 'user',
          });
      })
      .catch((e: AuthError) => {
        if (e.code === 'auth/email-already-in-use') {
          error = 'Email already in use!';
        }
      });
    return error;
  }

  async login(email: string, password: string) {
    let error: string | null = null;
    await signInWithEmailAndPassword(this.fAuth, email, password).catch(
      (e: AuthError) => {
        // console.log(e.message);
        if (e.message.includes('auth/invalid-credential')) {
          error = 'Wrong credentials!';
        } else if (e.message.includes('auth/too-many-requests)')) {
          error = 'Too many requests. Please try again later.';
        }
      }
    );

    if (error) return error;
    else return null;
  }

  async logout() {
    try {
      return await this.fAuth.signOut();
    } catch (error) {
      // console.error('Logout error:', error);
      return false;
    }
  }
}
