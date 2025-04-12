import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', pathMatch: 'full', redirectTo: '' },

  { path: 'signin', pathMatch: 'full', component: LoginComponent },
  { path: 'signup', pathMatch: 'full', component: RegisterComponent },

  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];
