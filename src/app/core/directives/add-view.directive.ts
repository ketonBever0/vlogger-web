import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[addView]',
})
export class AddViewDirective {
  @Output() public readonly viewsChange = new EventEmitter<number>();

  @HostListener('click')
  public onClick(): void {
    this.viewsChange.emit(1);
  }
}
