import { EventEmitter } from '@angular/core';

export class Room {

  private static readonly DICT: Record<string, Room> = {};

  static readonly EVENT = new EventEmitter<void>();

  static save(): void {
    Room.EVENT.emit();
    localStorage.rooms = JSON.stringify(Room.list.map((room: Room): Partial<Room> => room.export()));
  }

  static load(): void {
    if ('rooms' in localStorage) {
      (JSON.parse(localStorage.rooms) as Partial<Room>[]).forEach((data: Partial<Room>): void => {
        new Room(data);
      });
      Room.EVENT.emit();
    }
  }

  static generateId(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  static get(id: string): Room | null {
    if (id in Room.DICT) {
      return Room.DICT[id];
    }
    return null;
  }

  static get list(): Room[] {
    return Object.values(Room.DICT);
  }

  static remove(id: string): boolean {
    if (id in Room.DICT) {
      delete Room.DICT[id];
      return true;
    }
    return false;
  }

  id: string;

  constructor(data: Partial<Room>) {
    Object.assign(this, data);
    Room.DICT[data.id] = this;
  }

  export(): Partial<Room> {
    return {
      id: this.id,
    }
  }
}
