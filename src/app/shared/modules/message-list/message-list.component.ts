import { Component, Input } from '@angular/core';
import { Message } from '@app/shared/classes/message';
import { User } from '@app/shared/classes/user';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent {

  readonly user = User;

  @Input() messages: Partial<Message>[];

  @Input() classes: string = '';
}
