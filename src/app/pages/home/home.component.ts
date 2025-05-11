import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TourVideoService } from '../../core/services/tour-video/tour-video.service';
import { TourVideoCardComponent } from '../../layout/components/TourVideoCard/TourVideoCard.component';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [MatIconModule, TourVideoCardComponent, ScrollingModule],
})
export class HomeComponent implements OnInit {
  constructor(readonly tvService: TourVideoService) {}

  now = new Date();

  ngOnInit() {
    this.tvService.getTourVideos();
  }
}
