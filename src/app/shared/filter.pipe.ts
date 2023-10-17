import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchString: string, propName: string): any[] {
    const result: any = [];
    if (!value || searchString === '' || propName === '') {
      return value;
    }

    value.forEach((a: any) => {
      if (
        a[propName].trim().toLowerCase().includes(searchString.toLowerCase())
      ) {
        return result.push(a);
      }
    });
    return result;
  }
}
