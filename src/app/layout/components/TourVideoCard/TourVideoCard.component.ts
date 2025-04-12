import { Component, Input, OnInit } from '@angular/core';
import { TourVideo } from '../../../core/models/TourVideo';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';

@Component({
  imports: [MatButtonModule, MatCardModule, MatTooltipModule],
  selector: 'TourVideoCard',
  templateUrl: './TourVideoCard.component.html',
  styleUrls: ['./TourVideoCard.component.scss']
})
export class TourVideoCardComponent implements OnInit {

  @Input() tourVideo!: TourVideo;

  constructor() { }

  ngOnInit() {
  }

}
