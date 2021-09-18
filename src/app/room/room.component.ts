import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Message } from '@app/shared/classes/message';
import { Room } from '@app/shared/classes/room';
import { User } from '@app/shared/classes/user';
import { ApiService } from '@app/shared/services/api.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons/faFileUpload';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { UploadDirective } from '@modules/upload/upload.directive';
import { Subscription } from 'rxjs';

/**
 * @todo Make settings its own page.
 */
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnDestroy {

  /** Subscriptions inside the params watch. */
  private paramSubscription = new Subscription();

  /** Every subscription except {@see paramSubscription}. */
  private subscriptions = new Subscription();

  readonly faSettings: IconDefinition = faCog;
  readonly faUsers: IconDefinition = faUsers;
  readonly faUpload: IconDefinition = faFileUpload;

  readonly imageAcceptList = UploadDirective.IMAGE_ACCEPT_LIST;

  @ViewChild('viewElement') chatsElement: ElementRef<HTMLDivElement>;

  room: Room;

  input = '';

  view: 'messages' | 'settings' = 'messages';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) {
  }

  private scrollChatsToBottom(): void {
    if (this.view === 'messages') {
      setTimeout((): void => {
        const element: HTMLDivElement = this.chatsElement.nativeElement;
        element.scrollTop = element.scrollHeight;
        this.room.markAsRead();
      });
    }
  }

  ngOnInit(): void {
    this.subscriptions.add(this.route.params.subscribe((data: Params): void => {
      this.paramSubscription.unsubscribe();
      this.paramSubscription = new Subscription();
      this.view = 'messages';
      this.room = Room.get(data.id);
      if (!this.room) {
        this.room = new Room({ id: data.id });
        Room.save();
      }
      this.paramSubscription.add(this.room.onMessage.subscribe({
        next: (): void => {
          this.scrollChatsToBottom();
        },
      }));
      this.paramSubscription.add(this.room.onRemove.subscribe({
        next: (): void => {
          this.router.navigateByUrl('/');
        },
      }))
      this.scrollChatsToBottom();
    }));
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
    this.subscriptions.unsubscribe();
  }

  submit(attachment?: string): void {
    if (this.input || attachment) {
      const message = new Message({
        user: User.username,
        message: this.input,
        room: this.room.id,
        attachment,
      });
      this.api.postMessage(message).subscribe({
        next: (data: Message): void => {
          setTimeout((): void => {
            Object.assign(message, data);
          })
        },
      });
    }
    this.input = '';
  }

  showMembers(): void {
    this.view = 'messages';
    if (this.room.members?.count) {
      const members: string = Object.keys(this.room.members.members).map((id: string): string => id).join(', ');
      this.room.addMessage(Message.chatminal(`Online members are ${members}`, true));
    }
  }
}