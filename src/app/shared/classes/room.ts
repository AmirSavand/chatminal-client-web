import { EventEmitter } from "@angular/core";
import { Message } from "@app/shared/classes/message";
import { Pusher, PusherEvent, PusherError } from "@app/shared/classes/pusher";
import { Utils } from "@app/shared/classes/utils";
import { PresenceChannel, Members } from "pusher-js";

/**
 * Room is a virtual channel for users to chat in.
 * Each room has a unique ID and channel.
 *
 * Handles saving, loading, events, etc of all rooms.
 * Rooms are stored in storage.
 */
export class Room {

  /** Dict of all room instances mapped to their IDs. */
  private static readonly DICT: Record<string, Room> = {};

  /** Maximum number of messages to store in {@see messages}. */
  private static readonly MAX_MESSAGES = 500;

  /** Room IDs that are not allowed. */
  private static readonly FORBIDDEN_IDS: string[] = [
    "home",
    "support",
    "new",
    "settings",
  ];

  /** Triggered a room is saved to storage or loaded from storage. */
  static readonly ON_LIST_UPDATE = new EventEmitter<void>();

  /** Triggered when any room has a new message. */
  static readonly ON_MESSAGE = new EventEmitter<{ room: Room; message: Message }>();

  /** Save all rooms to storage. */
  static save(): void {
    Room.ON_LIST_UPDATE.emit();
    localStorage.rooms = JSON.stringify(Room.list.map((room: Room): Partial<Room> => room.export));
  }

  /** Load all rooms from storage. */
  static load(): void {
    if ("rooms" in localStorage) {
      (JSON.parse(localStorage.rooms) as Partial<Room>[]).forEach((data: Partial<Room>): void => {
        new Room(data);
      });
      Room.ON_LIST_UPDATE.emit();
    }
  }

  /** @returns randomly generated ID. */
  static generateId(): string {
    const id: string = Utils.randomKey(6);
    if (!Room.isValidId(id)) {
      return Room.generateId();
    }
    return Utils.randomKey(6);
  }

  /** @returns true if a room can be created with given ID. */
  static isValidId(id: string): boolean {
    return Boolean(
      id.length > 3 &&
      id.length < 64 &&
      !(id in Room.DICT) &&
      !Room.FORBIDDEN_IDS.includes(id)
    );
  }

  /** @returns room instance by given ID or null if not found. */
  static get(id: string): Room | null {
    if (id in Room.DICT) {
      return Room.DICT[id];
    }
    return null;
  }

  /** @returns list of all room instances. */
  static get list(): Room[] {
    return Object.values(Room.DICT);
  }

  /** Removes a room by given ID from the dict. */
  static remove(id: string): boolean {
    if (id in Room.DICT) {
      delete Room.DICT[id];
      Room.save();
      return true;
    }
    return false;
  }

  /** Pusher channel of this room. */
  private channel?: PresenceChannel;

  /** Triggered when a new message is received from pusher. */
  readonly onMessage = new EventEmitter<Message>();

  /** Triggered when room is deleted. */
  readonly onRemove = new EventEmitter<void>();

  /** Unique room ID. */
  id: string;

  /** Messages of this room. */
  messages: Partial<Message>[] = [];

  /** Pusher members data of this room. */
  members?: Members;

  /** Number of messages that are unread. */
  unread: number = 0;

  /** Alias/label for user. */
  alias?: string;

  constructor(data: Partial<Room>) {
    Object.assign(this, data);
    /** Add this instance to the dict. */
    Room.DICT[data.id] = this;
    /** If there are messages that are not instance of {@see Message}, convert them. */
    if (this.messages && !(this.messages[0] instanceof Message)) {
      this.messages = this.messages.map((message: Partial<Message>): Message => new Message(message));
    }
    /** Subscribe to channel. */
    this.connect();
  }

  /** @returns ID of pusher channel of this room. */
  get channelId(): string {
    return `presence-room-${this.id}`;
  }

  /** @returns dict of this room. */
  get export(): Partial<Room> {
    return {
      id: this.id,
      unread: this.unread,
      alias: this.alias,
      messages: this.messages
        .filter((message: Message): boolean => !message.temp)
        .map((message: Message): Partial<Message> => message.export),
    };
  }

  /** Deletes all messages except last {@see MAX_MESSAGES}. */
  private clampMessages(): void {
    if (this.messages.length > Room.MAX_MESSAGES) {
      this.messages = this.messages.splice(this.messages.length - Room.MAX_MESSAGES, this.messages.length);
    }
  }

  /** Connect to pusher channel. */
  connect(): void {
    /** Disconnect from previous channel instance. */
    this.disconnect();
    /** Create channel and subscribe to it. */
    this.channel = Pusher.subscribe(this.channelId) as PresenceChannel;
    this.addMessage(Message.chatminal(`Connecting to room ${this.alias || this.id}...`, true));
    /** Watch the success event. */
    this.channel.bind(PusherEvent.SUCCESS, (members: Members): void => {
      this.members = members;
      this.addMessage(Message.chatminal(`Connected to the room. You are now online.`, true));
    });
    /** Watch the member added event. */
    this.channel.bind(PusherEvent.MEMBER_ADDED, ({ id }: { id: string }): void => {
      this.members = this.channel.members;
      this.addMessage(Message.chatminal(`${id} connected to room.`));
    });
    /** Watch the member removed event. */
    this.channel.bind(PusherEvent.MEMBER_REMOVED, ({ id }: { id: string }): void => {
      this.members = this.channel.members;
      this.addMessage(Message.chatminal(`${id} disconnected from room.`));
    });
    /** Watch the error event. */
    this.channel.bind(PusherEvent.ERROR, (error: PusherError): void => {
      this.addMessage(Message.chatminal("Failed to connect to the room.", true));
      this.addMessage(Message.chatminal(`${error.type} ${error.type} (${error.status}).`, true));
    });
    /** Watch the message event. */
    this.channel.bind("message", (data: Message): void => {
      /** Update messages. */
      this.addMessage(new Message(data));
    });
  }

  /** Disconnect from pusher channel (if exists). */
  disconnect(): void {
    if (this.channel) {
      this.channel.unsubscribe();
      delete this.channel;
      delete this.members;
    }
  }

  /** Add a message and handle everything. */
  addMessage(message: Message): void {
    /** Add the new message to the list {@see messages}. */
    this.messages.push(message);
    /** Run a clean up for messages. */
    this.clampMessages();
    /** Trigger new message events. */
    this.onMessage.emit(message);
    Room.ON_MESSAGE.emit({ room: this, message });
    /** Save rooms. */
    if (!message.temp) {
      Room.save();
    }
  }

  /** Clear messages history. */
  clearMessages(): void {
    this.messages = [];
    Room.save();
  }

  /** Remove unread status. Resets the {@see unread}. */
  markAsRead(): void {
    this.unread = 0;
    Room.save();
  }

  /** Leave and delete room from storage. */
  remove(): void {
    Room.remove(this.id);
    this.onRemove.emit();
    this.disconnect();
  }

  /** Save this room. */
  save() {
    Room.save();
  }
}
