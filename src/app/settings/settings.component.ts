import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Notification } from '@app/shared/classes/notification';
import { Room } from '@app/shared/classes/room';
import { User } from '@app/shared/classes/user';
import { ReactiveFormData } from '@app/shared/interfaces/reactive-form-data';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  sounds = Notification.SOUNDS;

  form: ReactiveFormData = {
    error: {},
    form: this.formBuilder.group({
      /* User. */
      username: [User.username, Validators.required],
      /* Background effect. */
      backgroundEffectEnable: [User.backgroundEffectEnable],
      backgroundEffectColor: [User.backgroundEffectColor, Validators.required],
      backgroundEffectSpeed: [User.backgroundEffectSpeed, Validators.required],
      /* Notification. */
      notificationEnable: [User.notificationEnable],
      notificationRate: [User.notificationRate, Validators.required],
      notificationWhenFocused: [User.notificationWhenFocused],
      notificationSound: [User.notificationSound, Validators.required],
      notificationSoundEnable: [User.notificationSoundEnable],
      notificationSoundVolume: [User.notificationSoundVolume, Validators.required],
    }),
  }

  constructor(private formBuilder: FormBuilder) {
  }

  private get confirm(): boolean {
    return confirm('> Are you sure you want to do this?\n> This action can not be undone.')
  }

  ngOnInit(): void {
    this.form.form.get('notificationSound').valueChanges.subscribe({
      next: (value: string): void => {
        Notification.playSound(value);
      },
    });
  }

  submit(): void {
    if (!this.form.form.invalid) {
      this.form.form.patchValue({
        username: this.form.form.value.username.trim().substr(0, 20).replace(/\W/g, ''),
      });
      Object.assign(User, this.form.form.value);
      User.save();
      this.form.error = {};
      this.form.success = true;
    } else {
      this.form.error = { detail: 'Form contains bad values, fix them.' };
      this.form.success = false;
    }
    this.form.form.markAsUntouched();
  }

  resetRooms(): void {
    if (!this.confirm) {
      return;
    }
    Room.list.forEach((room: Room): void => {
      room.remove();
    });
    this.form.error = {};
    this.form.success = false;
  }

  resetUser(): void {
    if (!this.confirm) {
      return;
    }
    const username: string = User.username;
    User.reset();
    User.username = username;
    User.save();
    this.form.form.patchValue(User.export);
    this.form.error = {};
    this.form.success = false;
  }

  markAllAsRead(): void {
    Room.list.forEach((room: Room): void => {
      room.markAsRead();
    });
  }
}
