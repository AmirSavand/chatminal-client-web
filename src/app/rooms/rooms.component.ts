import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '@app/shared/classes/room';
import { User } from '@app/shared/classes/user';
import { VERSION } from '@app/shared/consts/version';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {

  rooms: Room[] = Room.list;

  user = User;

  isInRoom: boolean;

  version = VERSION;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (!User.username) {
      this.router.navigateByUrl('/settings');
      return;
    }
    Room.EVENT.subscribe((): void => {
      this.rooms = Room.list;
    });
  }

  create(): void {
    const id: string = prompt('Enter room ID if you want to join:', Room.generateId());
    if (id) {
      const room = new Room({ id });
      Room.save();
      this.router.navigate(['/', room.id]);
    }
  }
}
