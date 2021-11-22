import { DOCUMENT } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Message } from '@app/shared/classes/message';
import { Room } from '@app/shared/classes/room';
import { User } from '@app/shared/classes/user';
import { Utils } from '@app/shared/classes/utils';
import { File } from '@app/shared/interfaces/file';
import { ApiService } from '@app/shared/services/api.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons/faArrowCircleDown';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons/faFileUpload';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle';
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
  readonly faMessages: IconDefinition = faComment;
  readonly faMembers: IconDefinition = faUserCircle;
  readonly faUpload: IconDefinition = faFileUpload;
  readonly faSend: IconDefinition = faPaperPlane;
  readonly faScrollDown: IconDefinition = faArrowCircleDown;

  @ViewChild('chatsElement') chatsElement: ElementRef<HTMLDivElement>;
  @ViewChild('chatboxElement') chatboxElement: ElementRef<HTMLTextAreaElement>;

  room: Room;

  input = '';

  chatboxBig = false;

  view: 'messages' | 'settings' = 'messages';

  constructor(@Inject(DOCUMENT) private document: Document,
              private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) {
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
      this.chatboxElement?.nativeElement.focus();
      this.paramSubscription.add(this.room.onMessage.subscribe({
        next: (): void => {
          this.chatboxScrollDown();
        },
      }));
      this.paramSubscription.add(this.room.onRemove.subscribe({
        next: (): void => {
          this.router.navigateByUrl('/');
        },
      }));
      this.chatboxScrollDown();
    }));
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
    this.subscriptions.unsubscribe();
  }

  submit(file?: File): void {
    const isUnintended: boolean = Boolean(
      Utils.isOdd(Utils.countStringInString(this.input, /```/g)) ||
      this.input.includes('```\n```') ||
      this.input.includes('``````') ||
      this.input.includes('````'),
    );
    if (isUnintended && !confirm('Is this what you intend to send?')) {
      return;
    }
    if (this.input || file) {
      const message = new Message({
        user: User.username,
        message: this.input,
        room: this.room.id,
        file,
      });
      this.api.postMessage(message).subscribe({
        next: (data: Message): void => {
          setTimeout((): void => {
            Object.assign(message, data);
          });
        },
      });
    }
    this.input = '';
    this.chatboxChange(this.input);
  }

  showMembers(): void {
    this.view = 'messages';
    if (this.room.members?.count) {
      const members: string = Object.keys(this.room.members.members).map((id: string): string => id).join(', ');
      this.room.addMessage(Message.chatminal(`Online members are ${members}`, true));
    }
  }

  chatboxChange(value: string): void {
    this.chatboxBig = (
      value.includes('```') ||
      value.startsWith('#') ||
      Utils.countStringInString(value, /\n/g) >= 3
    );
    if (this.chatboxBig) {
      this.chatboxScrollDown();
    }
    /**
     * When chatbox gets taller, messages get covered sometimes,
     * so let's wait after animation time and check the scroll bot,
     * if it's less than a certain amount, scroll to bottom of the page.
     */
    setTimeout((): void => {
      const element: HTMLDivElement = this.chatsElement.nativeElement;
      const scrollBottom = element.scrollHeight - element.clientHeight - element.scrollTop;
      if (scrollBottom > 0 && scrollBottom < 300) {
        this.chatboxScrollDown();
      }
    }, 200);
  }

  chatboxNewLine(): void {
    this.document.execCommand('insertText', false, '\n');
  }

  chatboxScrollDown(): void {
    if (this.view === 'messages') {
      setTimeout((): void => {
        const element: HTMLDivElement = this.chatsElement.nativeElement;
        element.scrollTop = element.scrollHeight;
        this.room.markAsRead();
      });
    }
  }
}
