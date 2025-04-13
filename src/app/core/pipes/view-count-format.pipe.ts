import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatViewCount',
})
export class ViewCountFormatPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    if (value == 1) {
      return `${value} view`;
    }
    if (value == 0) {
      return 'No views yet.';
    }
    return `${value} views`;
  }
}
