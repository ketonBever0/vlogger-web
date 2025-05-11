import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { MyProfileComponent } from './pages/auth/my-profile/my-profile.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['signin']);

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', pathMatch: 'full', redirectTo: '' },
  

  {
    path: 'me',
    component: MyProfileComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectToLogin },
  },
  { path: 'signin', pathMatch: 'full', component: LoginComponent },
  { path: 'signup', pathMatch: 'full', component: RegisterComponent },

  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];
