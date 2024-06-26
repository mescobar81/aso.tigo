import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoSeparadorMiles'
})
export class FormatoSeparadorMilesPipe implements PipeTransform {

  transform(value: string): string {
    return value?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }
}
