import { Component, Input, OnInit } from '@angular/core';
import { TourVideo } from '../../../core/models/TourVideo';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { ViewCountFormatPipe } from '../../../core/pipes/view-count-format.pipe';
import { DatePipe } from '@angular/common';
import { AddViewDirective } from '../../../core/directives/add-view.directive';

@Component({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatBadgeModule,
    ViewCountFormatPipe,
    DatePipe,
    AddViewDirective,
  ],
  selector: 'TourVideoCard',
  templateUrl: './TourVideoCard.component.html',
  styleUrls: ['./TourVideoCard.component.scss'],
})
export class TourVideoCardComponent implements OnInit {
  @Input() tourVideo!: TourVideo;
  @Input() now!: Date;

  constructor() {}

  onView() {
    this.tourVideo.views += 1;
  }

  onViewsChange(value: number) {
    this.tourVideo.views += value;
  }

  ngOnInit() {}
}
