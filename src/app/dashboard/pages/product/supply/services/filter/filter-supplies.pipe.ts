import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSupplies',
  standalone: true
})
export class FilterSuppliesPipe implements PipeTransform {

  transform(supplies: any[], searchText: string): any[] {
    if(!supplies) return [];
    if(!searchText) return supplies;

    searchText = searchText.toLowerCase();

    return supplies.filter(supplies => {
      return supplies.name.toLowerCase().includes(searchText) ||
      supplies.category.name.toLowerCase().includes(searchText.toLowerCase());
    })
  }

}
