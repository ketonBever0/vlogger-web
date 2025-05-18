import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TourVideo } from '@app/core/models/TourVideo';
import { AuthService } from '@app/core/services/auth/auth.service';
import { TourVideoService } from '@app/core/services/tour-video/tour-video.service';

@Component({
  imports: [MatCardModule],
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.scss'],
})
export class MyVideosComponent implements OnInit {
  constructor(
    protected readonly tv: TourVideoService,
    private readonly fAuth: AuthService
  ) {}

  myVideos: TourVideo[] = [];

  async ngOnInit() {
    console.log(this.fAuth.userData?.id);
    while (!this.fAuth.userData?.id) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.myVideos = await this.tv.getMyVideos(this.fAuth.userData!.id);
    console.log(this.myVideos);
  }
}
