import { EventEmitter } from '@angular/core';
import { Notification } from '@app/shared/classes/notification';
import { Utils } from '@app/shared/classes/utils';

export class User {

  private static readonly EXPORT_PROPERTIES = {
    /* User. */
    username: `Unnamed_${Utils.randomKey(4)}`,
    /* Background effect. */
    backgroundEffectEnable: true,
    backgroundEffectColor: '#f4427d',
    backgroundEffectSpeed: 65,
    /* Notification. */
    notificationEnable: Notification.enable,
    notificationRate: Notification.rate,
    notificationWhenFocused: Notification.whenFocused,
    notificationSound: Notification.sound,
    notificationSoundEnable: Notification.soundEnable,
    notificationSoundVolume: Notification.soundVolume,
  };

  static readonly EVENT = new EventEmitter<void>();

  static username: string;

  static backgroundEffectEnable: boolean;

  static backgroundEffectColor: string;

  static backgroundEffectSpeed: number;

  static notificationEnable: boolean;

  static notificationRate: number;

  static notificationWhenFocused: boolean;

  static notificationSound: string;

  static notificationSoundEnable: boolean;

  static notificationSoundVolume: number;

  static get export(): Partial<User> {
    const data: Partial<User> = {};
    Object.keys(User.EXPORT_PROPERTIES).forEach((key: string): void => {
      data[key] = User[key];
    });
    return data;
  }

  static save(): void {
    localStorage.user = JSON.stringify(User.export);
    this.apply();
    User.EVENT.emit();
  }

  static load(): void {
    let migrated = false;
    try {
      const stored: Partial<User> = JSON.parse(localStorage.user);
      Object.assign(User, stored);
      for (const key of Object.keys(User.EXPORT_PROPERTIES)) {
        if (!(key in stored)) {
          User[key] = User.EXPORT_PROPERTIES[key];
          if (!migrated) {
            console.info('[user] Migration started.')
          }
          migrated = true;
          console.info(`[user] Migrated key ${key}`);
        }
      }
    } catch {
      User.reset();
    }
    if (!migrated) {
      this.apply();
      User.EVENT.emit();
    } else {
      console.info('[user] Migration completed.')
      User.save();
    }
  }

  static apply(): void {
    Notification.enable = User.notificationEnable;
    Notification.rate = User.notificationRate;
    Notification.whenFocused = User.notificationWhenFocused;
    Notification.sound = User.notificationSound;
    Notification.soundEnable = User.notificationSoundEnable;
    Notification.soundVolume = User.notificationSoundVolume;
  }

  static reset(): void {
    Object.keys(User.EXPORT_PROPERTIES).forEach((key: string): void => {
      User[key] = User.EXPORT_PROPERTIES[key];
    });
    this.apply();
  }
}
