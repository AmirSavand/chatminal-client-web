import { Matcher } from '@app/shared/types/matcher';

export class Utils {

  /**
   * Remove a child item from a list.
   */
  static removeChild<T>(list: T[], child: T): void {
    list.splice(list.indexOf(child), 1);
  }

  /**
   * @returns Number of years from given date until now.
   */
  static getAgeFromDate(date: Date): number {
    const difference: number = Math.abs(Date.now() - date.getTime());
    return Math.floor(difference / (1000 * 3600 * 24) / 365.25);
  }

  /**
   * Converts {@link URLSearchParams} to an object.
   *
   * @param urlSearchParams Required to convert to an object.
   */
  static URLSearchParamsToObject(urlSearchParams: URLSearchParams): Record<string, string> {
    const params: Record<string, string> = {};
    urlSearchParams.forEach((value: string, key: string): void => {
      params[key] = value;
    });
    return params;
  }

  static getRandomItem<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
  }

  static isValidHexColor(color: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(color);
  }

  static randomKey(length = 6): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  static getColorFromString(str): string {
    let hash: number = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour: string = '#';
    for (let i = 0; i < 3; i++) {
      const value: number = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  static shadeColor(color: string, amount: number): string {
    let usePound = false;
    if (color[0] == '#') {
      color = color.slice(1);
      usePound = true;
    }
    const num = parseInt(color, 16);
    let r = (num >> 16) + amount;
    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }
    let b = ((num >> 8) & 0x00FF) + amount;
    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }
    let g = (num & 0x0000FF) + amount;
    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }
    return `${usePound ? '#' : ''}${(g | (b << 8) | (r << 16)).toString(16)}`;
  }

  static countStringInString(source: string, match: Matcher): number {
    return (source.match(match) || []).length;
  }
}
