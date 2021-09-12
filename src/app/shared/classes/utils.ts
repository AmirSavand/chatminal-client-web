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
}
