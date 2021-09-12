export class InlineStorage<T> {

  value: T | null;

  constructor(public key: string, defaultValue: T = null) {
    if (key in localStorage) {
      this.value = JSON.parse(localStorage[key]);
    } else {
      this.update(defaultValue);
    }
  }

  update(value: T): void {
    localStorage[this.key] = JSON.stringify(value);
    this.value = value;
  }
}
