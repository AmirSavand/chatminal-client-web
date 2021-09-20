import { Utils } from '@app/shared/classes/utils';
import { File } from '@app/shared/interfaces/file';

export class Message {

  static chatminal(message: string, temp?: boolean): Message {
    return new Message({ user: 'Chatminal', message, temp });
  }

  user: string;

  userColor?: string;

  message: string;

  file?: File;

  room?: string;

  presence?: boolean;

  channel?: string;

  /** Is message content multiline? */
  multiline = false;

  /** Is this a temporary message? */
  temp?: boolean;

  get export(): Partial<Message> {
    let output: Partial<Message> = {
      user: this.user,
      message: this.message,
    };
    if (this.file) {
      output.file = this.file;
    }
    return output;
  }

  constructor(data: Partial<Message>) {
    Object.assign(this, data);
    this.checkMultiline();
    this.checkUserColor();
  }

  checkMultiline(): void {
    this.multiline = this.message.includes('\n');
  }

  checkUserColor(): void {
    this.userColor = Utils.shadeColor(Utils.getColorFromString(this.user), 90);
  }
}
