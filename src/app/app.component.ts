import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  @ViewChild('background') background: ElementRef<HTMLCanvasElement>;

  rooms: Room[];

  user = User;

  isInPage: boolean;

  version = VERSION;

  constructor(private router: Router) {
  }

  private setupBackground(): void {
    const c: HTMLCanvasElement = this.background.nativeElement;
    const ctx: CanvasRenderingContext2D = c.getContext('2d');
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
      ctx.fillStyle = '#f4427d';
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        let text: string = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > c.height && Math.random() > 0.975)
          drops[i] = 0;
        drops[i]++;
      }
    }
    setInterval(draw, 35);
  }

  ngOnInit(): void {
    User.load();
    Room.load();
    Pusher.connect();
    this.rooms = Room.list;
    if (!User.username) {
      this.router.navigateByUrl('/settings');
      return;
    }
    Room.EVENT.subscribe((): void => {
      this.rooms = Room.list;
    });
  }

  ngAfterViewInit(): void {
    this.setupBackground();
  }

  createRoom(): void {
    const id: string = prompt('Enter room ID if you want to join:', Room.generateId());
    if (id) {
      const room = new Room({ id });
      Room.save();
      this.router.navigate(['/', room.id]);
    }
  }
}
