import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { AuthService } from './core/services/auth/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatProgressSpinnerModule,
    NgIf,
    RouterLink,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'vlogger-web';

  isAppLoading = false;
  constructor(
    private router: Router,
    protected readonly authService: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isAppLoading = true;
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isAppLoading = false;
        }, 200);
      }
    });
  }

  @ViewChild('drawer') drawer!: MatDrawer;

  onToggleDrawer() {
    this.drawer.toggle();
  }

  ngOnInit() {
    const loadingScreen = document.getElementById('loading-screen');
    window.onload = () => {
      if (loadingScreen) {
        loadingScreen.style.display = 'none';
      }
    };
  }
}
