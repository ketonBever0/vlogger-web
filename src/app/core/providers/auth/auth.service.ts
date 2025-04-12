import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User as fUser } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: fUser | null = null;

  constructor(private fAuth: AngularFireAuth) {}

  async register(email: string, password: string) {
    try {
      return await this.fAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Registration error:', error);
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      return await this.fAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
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
