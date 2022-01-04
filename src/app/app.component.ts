import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { RoomComponent } from '@app/room/room.component';
import { Message } from '@app/shared/classes/message';
import { Notification } from '@app/shared/classes/notification';
import { Pusher } from '@app/shared/classes/pusher';
import { Room } from '@app/shared/classes/room';
import { User } from '@app/shared/classes/user';
import { VERSION } from '@app/shared/consts/version';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  backgroundEffectTimer: number;

  @ViewChild('background') background: ElementRef<HTMLCanvasElement>;

  rooms: Room[];

  user = User;

  version = VERSION;

  active: RoomComponent | any;

  private startBackgroundEffect(): void {
    const c: HTMLCanvasElement = this.background.nativeElement;
    const ctx: CanvasRenderingContext2D = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    clearTimeout(this.backgroundEffectTimer);
    if (!User.backgroundEffectEnable) {
      c.style.display = 'none';
      return;
    } else {
      c.style.display = 'block';
    }
    c.height = window.innerHeight;
    c.width = window.innerWidth;
    const matrix = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}'.split('');
    const fontSize = 14;
    const columns = c.width / fontSize; // number of columns for the rain
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }
    const draw: () => void = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = User.backgroundEffectColor;
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        let text: string = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > c.height && Math.random() > 0.975)
          drops[i] = 0;
        drops[i]++;
      }
      this.backgroundEffectTimer = setTimeout(draw, 100 - User.backgroundEffectSpeed);
    };
    draw();
  }

  ngOnInit(): void {
    Pusher.connect();
    User.load();
    Room.load();
    this.rooms = Room.list;
    Room.ON_LIST_UPDATE.subscribe({
      next: (): void => {
        this.rooms = Room.list;
      },
    });
    Room.ON_MESSAGE.subscribe({
      next: ({room, message}: { room: Room; message: Message }): void => {
        /** If message is not from current user and not temp message. */
        if (message.user !== User.username && !message.temp) {
          /** Trigger notification. */
          Notification.trigger();
          /** Increase unread counter. */
          if (this.active?.room?.id !== room.id) {
            room.unread++;
          }
        }
      },
    });
  }

  ngAfterViewInit(): void {
    this.startBackgroundEffect();
    User.EVENT.subscribe((): void => {
      if (this.background.nativeElement.style.display === 'block' && !User.backgroundEffectEnable) {
        this.startBackgroundEffect();
      }
      if (this.background.nativeElement.style.display !== 'block' && User.backgroundEffectEnable) {
        this.startBackgroundEffect();
      }
    });
  }

  onActivate($event: RoomComponent | any): void {
    this.active = $event;
  }
}
