import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirstLetterService {

    constructor() { }

    getFirstLetterOfName(name: string) {
        const cyrillic = {1 : 'а', 2 : 'б', 3 : 'в', 4 : 'г', 5 : 'д', 6 : 'е', 7 : 'ж', 8 : 'з', 9 : 'и',
                          10 : 'й', 11 : 'к', 12 : 'л', 13 : 'м', 14 : 'н', 15 : 'о', 16 : 'п',
                          17 : 'р', 18 : 'с', 19 : 'т', 20 : 'у', 21 : 'ф', 22 : 'х', 23 : 'ц',
                          24 : 'ч', 25 : 'ш', 26 : 'щ', 27 : 'ъ', 28 : 'ь', 29 : 'ю', 30 : 'я'};

        let alphabetKey: string ;

        const out = name.replace(/\d+/g, '');
        const out_space = out.trim().toLowerCase();
        const first_letter = out_space.substring(0, 1);

        Object.entries(cyrillic).forEach(
          ([key, value]) => {
            if (value.match(first_letter)) {
              return alphabetKey = key;
            }
          }
        );

        return alphabetKey;
    }
}
