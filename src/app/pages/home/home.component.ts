import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TourVideoService } from '../../core/services/tour-video/tour-video.service';
import { TourVideoCardComponent } from '../../layout/components/TourVideoCard/TourVideoCard.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatIconModule, TourVideoCardComponent],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(readonly tvService: TourVideoService) {}

  now = new Date();

  ngOnInit() {
    this.tvService.getTourVideos();
  }

  @ViewChild('videoReel') videoReel!: ElementRef;
  startX = 0;
  scrollLeft = 0;

  ngAfterViewInit() {
      const reel: HTMLElement = this.videoReel.nativeElement;

      reel.addEventListener('touchstart', (e: TouchEvent) => {
        this.startX = e.touches[0].pageX - reel.offsetLeft;
        this.scrollLeft = reel.scrollLeft;
      })
      
      reel.addEventListener('touchmove', (e: TouchEvent) => {
        const x = e.touches[0].pageX - reel.offsetLeft;
        const walk = (x - this.startX) * 2;
        reel.scrollLeft = this.scrollLeft - walk;
      })
  }

  // @ViewChild('videoReel') videoReel!: ElementRef;
  // ngAfterViewInit() {
  //   this.videoReel.nativeElement.addEventListener('scroll', () => {
  //     const scrollLeft = this.videoReel.nativeElement.scrollLeft;
  //     const scrollWidth = this.videoReel.nativeElement.scrollWidth;
  //     const clientWidth = this.videoReel.nativeElement.clientWidth;

  //     if (scrollLeft + clientWidth >= scrollWidth) {
  //       // TODO: Load more videos
  //       this.videoReel.nativeElement.classList.add('at-start');
  //     }
  //     if (scrollLeft === 0) {
  //       this.videoReel.nativeElement.classList.add('at-end');
  //     }
  //   });
  // }
}
