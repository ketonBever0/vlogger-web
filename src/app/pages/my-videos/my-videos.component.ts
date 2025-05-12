import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TourVideo } from '@app/core/models/TourVideo';
import { AuthService } from '@app/core/services/auth/auth.service';
import { TourVideoService } from '@app/core/services/tour-video/tour-video.service';

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyVideosComponent implements OnInit {
  constructor(
    private readonly tv: TourVideoService,
    private readonly fAuth: AuthService
  ) {}

  myVideos: TourVideo[] = [];

  async ngOnInit() {
    if (this.fAuth.userData?.id)
      this.myVideos = await this.tv.getMyVideos(this.fAuth.userData!.id);
    console.log(this.myVideos);
  }
}
