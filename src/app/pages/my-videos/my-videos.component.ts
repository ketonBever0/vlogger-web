import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import OnUserDataFetch from '@app/core/hooks/OnUserDataFetch';
import { TourVideo } from '@app/core/models/TourVideo';
import { AuthService } from '@app/core/services/auth/auth.service';
import { TourVideoService } from '@app/core/services/tour-video/tour-video.service';

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyVideosComponent implements OnInit, OnUserDataFetch, OnDestroy {
  constructor(
    private readonly tv: TourVideoService,
    private readonly fAuth: AuthService
  ) {}

  myVideos: TourVideo[] = [];

  async ngOnInit() {
    this.fAuth.registerOnUserDataFetchHandler(this);
  }

  ngOnDestroy() {
    this.fAuth.unregisterOnUserDataFetchHandler(this);
  }

  async onUserDataFetch() {
    console.log(this.fAuth.userData?.id);
    this.myVideos = await this.tv.getMyVideos(this.fAuth.userData!.id);
  }
}
