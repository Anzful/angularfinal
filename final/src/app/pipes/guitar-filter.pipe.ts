import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'guitarFilter'
})
export class GuitarFilterPipe implements PipeTransform {

  /**
   * @param guitars   An array of guitars
   * @param searchTerm The search string to filter by
   * @return          A filtered array of guitars whose name or brand matches searchTerm
   */
  transform(guitars: any[], searchTerm: string): any[] {
    if (!guitars || !searchTerm) {
      return guitars;
    }
    const lowerTerm = searchTerm.toLowerCase();
    return guitars.filter(guitar => {
      const nameMatch = guitar.name.toLowerCase().includes(lowerTerm);
      const brandMatch = guitar.brand.toLowerCase().includes(lowerTerm);
      return nameMatch || brandMatch;
    });
  }
}
