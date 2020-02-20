import { Pipe, PipeTransform } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Pipe({
  name: 'ngbDatePipe'
})
export class NgbDatePipe implements PipeTransform {

  transform(value: NgbDateStruct, ...args: unknown[]): string {
    const date = new Date(value.year, value.month, value.day)
    return date.toLocaleDateString();
  }

}
