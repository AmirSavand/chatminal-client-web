import { EventEmitter } from '@angular/core';

/**
 * Sound and popup notification class.
 */
export class Notification {

  private static lastNotification = 0;

  private static updateLastNotification(): void {
    Notification.lastNotification = Date.now();
  }

  private static get isReadyByRate(): boolean {
    return Date.now() - Notification.lastNotification >= Notification.rate * 1000;
  }

  private static get isReadyByFocus(): boolean {
    if (!document.hasFocus()) {
      return true;
    }
    return Notification.whenFocused;
  }

  private static get isReady(): boolean {
    return Notification.isReadyByRate && Notification.isReadyByFocus;
  }

  static readonly NOTIFICATION = new EventEmitter<boolean>();

  static readonly SOUNDS = [
    'accomplished',
    'hey-take-a-look',
    'me-too',
    'time-is-now',
    'anxious',
    'hey',
    'message',
    'tweet',
    'appointed',
    'hiccup',
    'mmm',
    'undeniable',
    'beyond-doubt',
    'hollow',
    'open-up',
    'unsure',
    'bubbling-up',
    'intuition',
    'served',
    'what-if',
    'clearly',
    'juntos',
    'sharp',
    'you-wouldnt-believe',
    'for-sure',
    'just-maybe',
    'swiftly',
  ];

  static sound: string = Notification.SOUNDS[0];

  static soundVolume: number = 100;

  static enable = true;

  static soundEnable = true;

  static whenFocused = false;

  static rate = 1;

  static getSoundPath(sound: string): string {
    if (!Notification.isValidSound(sound)) {
      sound = Notification.SOUNDS[0];
    }
    return `/assets/audio/${sound}.mp3`;
  }

  static isValidSound(sound: string): boolean {
    return Notification.SOUNDS.includes(sound);
  }

  static playSound(sound: string): void {
    const audio = new Audio(Notification.getSoundPath(sound));
    audio.volume = Notification.soundVolume / 100;
    try {
      audio.play();
    } catch (e) {
    }
  }

  static triggerSound(): void {
    if (!Notification.soundEnable) {
      return;
    }
    Notification.playSound(Notification.sound);
  }

  static trigger(): void {
    if (!Notification.isReady) {
      Notification.NOTIFICATION.emit(false);
      return;
    }
    Notification.triggerSound();
    Notification.updateLastNotification();
    Notification.NOTIFICATION.emit(true);
  }
}
