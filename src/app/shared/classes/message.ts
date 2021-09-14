export class Message {

  static chatminal(message: string, room: string): Message {
    return new Message('Chatminal', message, room);
  }

  constructor(public user: string,
              public message: string,
              public room: string) {
  }
}
