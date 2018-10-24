import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'numberToString'})
export class NumberToString implements PipeTransform {
  transform(value: number): String {
    let returnValue = value.toString();

    if (value < 10){
      return "0" + returnValue;
    }
    else{
      return returnValue;
    }
  }
}