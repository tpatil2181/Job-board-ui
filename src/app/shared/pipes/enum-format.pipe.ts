import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumFormat',
  standalone: true
})
export class EnumFormatPipe implements PipeTransform {

 transform(value: string | null | undefined): string {

    if (!value) {
      return '';
    }

    return value.charAt(0).toUpperCase()
      + value.slice(1).toLowerCase();
  }

}

// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'enumFormat',
//   standalone: true
// })
// export class EnumFormatPipe implements PipeTransform {

//   transform(value: string | null | undefined): string {

//     if (!value) {
//       return '';
//     }

//     return value.charAt(0).toUpperCase()
//       + value.slice(1).toLowerCase();
//   }

// }