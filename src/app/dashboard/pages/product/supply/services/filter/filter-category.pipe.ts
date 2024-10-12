import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory',
  standalone: true
})
export class FilterCategoryPipe implements PipeTransform {

  transform(categories: any[], searchText: string): any[] {
    if(!categories) return [];
    if(!searchText) return categories;

    searchText = searchText.toLowerCase();

    return categories.filter(categories => {
      return categories.name.toLowerCase().includes(searchText)
    })
  }

}
