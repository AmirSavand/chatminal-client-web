import { EventEmitter } from '@angular/core';

export class User {

  static readonly EVENT = new EventEmitter<void>();

  static username: string;

  static save(): void {
    localStorage.username = this.username;
    User.EVENT.emit();
  }

  static load(): void {
    User.username = localStorage.username;
    User.EVENT.emit();
  }
}
