import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformareSir'
})
export class TransformareSirPipe implements PipeTransform {

  transform(value: string, param : string): string {
    console.log('inside pipe value: ', value);
    console.log('args sunt: ', param);
    if(param == 'uc'){
      return value.toUpperCase();
    }
    return value.toLowerCase();
  }

}
