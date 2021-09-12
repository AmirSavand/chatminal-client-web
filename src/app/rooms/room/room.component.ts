import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Message } from '@app/shared/classes/message';
import { Pusher } from '@app/shared/classes/pusher';
import { Room } from '@app/shared/classes/room';
import { User } from '@app/shared/classes/user';
import { ApiService } from '@app/shared/services/api.service';
import { Channel } from 'pusher-js';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnDestroy {

  @ViewChild('chatsElement') chatsElement: ElementRef<HTMLDivElement>;

  room: Room;

  messages: Message[] = [];

  input = '';

  channel: Channel;

  user: User;

  constructor(private route: ActivatedRoute,
              private api: ApiService) {
  }

  private scrollChatsToBottom(): void {
    setTimeout((): void => {
      const element: HTMLDivElement = this.chatsElement.nativeElement;
      element.scrollTop = element.scrollHeight;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params): void => {
      this.room = Room.get(data.id);
      if (!this.room) {
        this.room = new Room({ id: data.id });
        Room.save();
      }
      if (this.channel) {
        Pusher.unsubscribe(this.channel);
      }
      this.channel = Pusher.subscribe(this.room.id);
      this.channel.bind('message', (data: Message): void => {
        if (data.user === User.username) {
          return;
        }
        this.messages.push(new Message(data.user, data.message, data.room));
        this.scrollChatsToBottom();
      });
    });
  }

  ngOnDestroy(): void {
    Pusher.unsubscribe(this.channel);
  }

  submit(): void {
    if (this.input) {
      const message = new Message(User.username, this.input, this.room.id);
      this.api.postMessage(message).subscribe();
      this.messages.push(message);
      this.scrollChatsToBottom();
    }
    this.input = '';
  }
}
