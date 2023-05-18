import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any[] {
    if (!value) return []
    return Object.entries(value.news).map(([key, val]) => ({ key, value: val }));
  }

}
