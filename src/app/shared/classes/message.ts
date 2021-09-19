import { File } from '@app/shared/interfaces/file';

export class Message {

  static chatminal(message: string, temp?: boolean): Message {
    return new Message({ user: 'Chatminal', message, temp });
  }

  user: string;

  message: string;

  file?: File;

  room?: string;

  presence?: boolean;

  channel?: string;

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
  }
}
