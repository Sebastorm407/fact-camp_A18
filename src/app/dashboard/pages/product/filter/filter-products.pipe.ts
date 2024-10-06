import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducts',
  standalone: true
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: any[], searchText: string): any[] {
    if (!products) return [];
    if (!searchText) return products;

    searchText = searchText.toLowerCase();

    return products.filter(product => {
      return product.name.toLowerCase().includes(searchText);
    });
  }

}
