import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extraerCadena'
})
export class ExtraerCadenaPipe implements PipeTransform {

  transform(value: string, start?:number, end?:number): string {
    return value.substr(value.lastIndexOf('/') + 1);
  }

}
