import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Pusher } from '@app/shared/classes/pusher';
import { Room } from '@app/shared/classes/room';
import { User } from '@app/shared/classes/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('background') background: ElementRef<HTMLCanvasElement>;

  ngOnInit():void {
    User.load();
    Room.load();
    Pusher.connect();
  }

  ngAfterViewInit(): void {
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
}
