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
  isDown = false;
  startX = 0;
  scrollLeft = 0;

  ngAfterViewInit() {
    const reel = this.videoReel.nativeElement;

    reel.addEventListener('mousedown', (e: MouseEvent) => this.startDrag(e));
    reel.addEventListener('mouseleave', () => this.endDrag());
    reel.addEventListener('mouseup', () => this.endDrag());
    reel.addEventListener('mousemove', (e: MouseEvent) => this.drag(e));

    reel.addEventListener('touchstart', (e: TouchEvent) => this.startDrag(e.touches[0]));
    reel.addEventListener('touchend', () => this.endDrag());
    reel.addEventListener('touchmove', (e: TouchEvent) => this.drag(e.touches[0]));
  }

  startDrag(e: MouseEvent | Touch) {
    this.isDown = true;
    this.startX = e.pageX - this.videoReel.nativeElement.offsetLeft;
    this.scrollLeft = this.videoReel.nativeElement.scrollLeft;
  }

  endDrag() {
    this.isDown = false;
  }

  drag(e: MouseEvent | Touch) {
    if (!this.isDown) return;
    if ('preventDefault' in e) {
      e.preventDefault();
    }
    const x = e.pageX - this.videoReel.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    this.videoReel.nativeElement.scrollLeft = this.scrollLeft - walk;
  }
}
