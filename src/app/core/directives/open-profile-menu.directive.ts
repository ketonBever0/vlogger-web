import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[openProfileMenu]',
})
export class OpenProfileMenuDirective implements OnInit {
  profileMenuElement: HTMLElement | null = null;

  timer: NodeJS.Timeout | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.profileMenuElement = document.getElementById('profile-menu');

    if (this.profileMenuElement) {
      this.renderer.setStyle(this.profileMenuElement, 'display', 'none');
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    clearTimeout(this.timer!);
    if (this.profileMenuElement) {
      this.renderer.setStyle(this.profileMenuElement, 'display', 'flex');
    }
  }
  @HostListener('mouseleave', ['$event']) onMouseLeaveElement(event: MouseEvent) {
    if (this.profileMenuElement && !this.profileMenuElement.contains(event.relatedTarget as Node)) {
      this.timer = setTimeout(() => {
        this.renderer.setStyle(this.profileMenuElement, 'display', 'none');
      }, 200);
    }
  }

  @HostListener('document:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (
      this.profileMenuElement &&
      this.profileMenuElement.contains(event.target as Node)
    ) {
      clearTimeout(this.timer!);
      this.renderer.setStyle(this.profileMenuElement, 'display', 'flex');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.profileMenuElement) {
      this.timer = setTimeout(() => {
        this.renderer.setStyle(this.profileMenuElement, 'display', 'none');
      }, 100);
    }
  }
}
