import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceDash'
})
export class ReplaceDashPipe implements PipeTransform {

  transform(value: string): string {
    if(value === 'ho-oh') {
      return value;
    }
    return value ? value.replace(/-/g, ' ') : '';
  }

}
