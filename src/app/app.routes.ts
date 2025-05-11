import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { MyProfileComponent } from './pages/auth/my-profile/my-profile.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['signin']);

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  { path: 'home', pathMatch: 'full', redirectTo: '' },

  {
    path: 'me',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectToLogin },
    loadChildren: () =>
      import('./pages/auth/my-profile/my-profile.module').then(
        (m) => m.MyProfileModule
      ),
  },
  {
    path: 'upload',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectToLogin },
    loadChildren: () =>
      import('./pages/video-upload/video-upload.module').then(
        (m) => m.VideoUploadModule
      ),
  },
  { path: 'signin', pathMatch: 'full', component: LoginComponent },
  { path: 'signup', pathMatch: 'full', component: RegisterComponent },

  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];
