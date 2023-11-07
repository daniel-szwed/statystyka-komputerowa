import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundToOneDecimal'
})
export class RoundToOneDecimalPipe implements PipeTransform {
  transform(value: number): string {
    if (value !== undefined && value !== null) {
      return value.toFixed(1);
    }
    return '';
  }
}
