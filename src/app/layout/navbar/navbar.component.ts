import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../core/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { OpenProfileMenuDirective } from '../../core/directives/open-profile-menu.directive';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  imports: [RouterLink, MatButtonModule, MatIconModule, MatTooltipModule, OpenProfileMenuDirective],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() toggleDrawerEvent = new EventEmitter<void>();

  constructor(protected readonly authService: AuthService) {}

  // isProfileMenuOpen = false;
  // toggleProfileMenu() {
  //   this.isProfileMenuOpen = !this.isProfileMenuOpen;
  // }

  toggleDrawer() {
    this.toggleDrawerEvent.emit();
  }

  snackbar = inject(MatSnackBar);
  logout() {
    this.authService.logout().then(() => {
      this.snackbar.open('Logged out successfully!', '', {
        duration: 2000,
      });
      // this.isProfileMenuOpen = false;
    });
  }
}
