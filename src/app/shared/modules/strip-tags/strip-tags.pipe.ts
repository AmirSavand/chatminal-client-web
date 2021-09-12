import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripTags',
})
export class StripTagsPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/<.*?>/g, ''); // replace tags
  }
}
