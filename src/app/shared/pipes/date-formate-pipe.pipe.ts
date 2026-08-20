import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatePipe',
  standalone: true
})
export class DateFormatePipePipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {

    if (!value) {
      return '';
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return '';
    }

    const today = new Date();

    // Remove time portion
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const inputDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const difference =
      todayDate.getTime() - inputDate.getTime();

    const oneDay = 1000 * 60 * 60 * 24;

    // Today
    if (difference === 0) {
      return 'Today';
    }

    // Yesterday
    if (difference === oneDay) {
      return 'Yesterday';
    }

    // Example: 20 Aug 2026
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
}
