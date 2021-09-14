import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Message } from '@app/shared/classes/message';
import { Pusher, PusherEvent, PusherError } from '@app/shared/classes/pusher';
import { Room } from '@app/shared/classes/room';
import { User } from '@app/shared/classes/user';
import { ApiService } from '@app/shared/services/api.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { Members, PresenceChannel } from 'pusher-js';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnDestroy {

  static readonly MAX_MESSAGES = 500;

  readonly faSettings: IconDefinition = faCog;
  readonly faUsers: IconDefinition = faUsers;

  @ViewChild('viewElement') chatsElement: ElementRef<HTMLDivElement>;

  room: Room;

  messages: Message[] = [];

  input = '';

  channel: PresenceChannel;

  user = User;

  members: Members;

  view: 'chats' | 'settings' = 'chats';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) {
  }

  private scrollChatsToBottom(): void {
    if (this.view === 'chats') {
      setTimeout((): void => {
        const element: HTMLDivElement = this.chatsElement.nativeElement;
        element.scrollTop = element.scrollHeight;
      });
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params): void => {
      this.view = 'chats';
      this.room = Room.get(data.id);
      if (!this.room) {
        this.room = new Room({ id: data.id });
        Room.save();
      }
      if (this.channel) {
        Pusher.unsubscribe(this.channel);
        this.messages = [];
      }
      this.messages.push(Message.chatminal(`Connecting to room ${this.room.id}...`, this.room.id));
      this.channel = Pusher.subscribe(this.room.channel) as PresenceChannel;
      this.channel.bind(PusherEvent.SUCCESS, (members: Members): void => {
        this.members = members;
        this.messages.push(Message.chatminal(`Connected to the room. You are now online.`, this.room.id));
      });
      this.channel.bind(PusherEvent.MEMBER_ADDED, ({ id }: { id: string }): void => {
        this.members = this.channel.members;
        this.messages.push(Message.chatminal(`${id} join the room.`, this.room.id));
      });
      this.channel.bind(PusherEvent.MEMBER_REMOVED, ({ id }: { id: string }): void => {
        this.members = this.channel.members;
        this.messages.push(Message.chatminal(`${id} left the room.`, this.room.id));
      });
      this.channel.bind(PusherEvent.ERROR, (error: PusherError): void => {
        this.messages.push(Message.chatminal('Failed to connect to the room.', this.room.id));
        this.messages.push(Message.chatminal(`${error.type} ${error.type} (${error.status}).`, this.room.id));
      });
      this.channel.bind('message', (data: Message): void => {
        if (data.user !== User.username) {
          this.messages.push(new Message(data.user, data.message, data.room));
          this.scrollChatsToBottom();
        }
        if (this.messages.length > RoomComponent.MAX_MESSAGES) {
          this.messages = this.messages.splice(this.messages.length - RoomComponent.MAX_MESSAGES, this.messages.length);
        }
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

  showMembers(): void {
    this.view = 'chats';
    if (this.members?.count) {
      const members: string = Object.keys(this.members.members).map((id: string): string => id).join(', ');
      this.messages.push(Message.chatminal(`Online members are ${members}`, this.room.id));
    }
  }

  remove(): void {
    Room.remove(this.room.id);
    Room.save();
    this.router.navigateByUrl('/');
  }
}
