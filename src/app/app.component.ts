import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { AuthService } from './core/providers/auth/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    NavbarComponent,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatProgressSpinnerModule,
    NgIf,
  ],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'vlogger-web';

  isAppLoading = false;
  constructor(private router: Router) {
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
    window.onload = () => {
      document.getElementById('loading-screen')!.style.display = 'none';
    };
  }
}
