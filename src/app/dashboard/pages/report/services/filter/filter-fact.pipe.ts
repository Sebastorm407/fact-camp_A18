import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFact',
  standalone: true
})
export class FilterFactPipe implements PipeTransform {

  transform(bill: any[], searchText: string): any[] {
    if(!bill) return [];
    if(!searchText) return bill;

    searchText = searchText.toLowerCase();

    return bill.filter(bills => {
      return bills.make_date.toLowerCase().includes(searchText);
    })
  }

}
