import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linebreaks'
})
export class LinebreaksPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value.replace(/\n/g, '<br />');;
  }

}
