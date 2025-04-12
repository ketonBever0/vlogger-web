import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  imports: [RouterLink, MatButtonModule, MatIconModule, MatTooltipModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() toggleDrawerEvent = new EventEmitter<void>();

  toggleDrawer() {
    this.toggleDrawerEvent.emit();
  }
}
