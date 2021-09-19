import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bytes' })
export class BytesPipe implements PipeTransform {

  /**
   * Setup units
   */
  private static readonly UNITS: string[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  /**
   * Converts a long number of bytes into a readable format e.g KB, MB, GB, TB, YB
   *
   * @param value The number of bytes
   */
  transform(value: number): string {
    /**
     * Check if given number is negative
     */
    const isNegative: boolean = value < 0;
    /**
     * Check if negative
     */
    if (isNegative) {
      value = -value;
    }
    /**
     * Check if given value is less than 1
     */
    if (value < 1) {
      return (isNegative ? '-' : '') + value + ' B';
    }
    const exponent: number = Math.min(
      Math.floor(Math.log(value) / Math.log(1000)),
      BytesPipe.UNITS.length - 1,
    );
    /**
     * Convert to number
     */
    value = Number((value / Math.pow(1000, exponent)).toFixed(2));
    /**
     * Convert number into readable format
     */
    return (isNegative ? '-' : '') + value + ' ' + BytesPipe.UNITS[exponent];
  }
}
