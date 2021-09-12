import { environment } from '@environments/environment';

import { default as PusherJS, Channel } from 'pusher-js';

/**
 * Handles pusher connecting, pusher disconnecting, chancel
 * subscribing and channel unsubscribe for components.
 */
export class Pusher {

  /** Pusher client instance. */
  private static pusher: PusherJS;

  /** Connect to pusher. */
  static connect(): void {
    Pusher.pusher = new PusherJS(environment.pusherKey, {
      cluster: environment.pusherCluster,
      forceTLS: true,
    });
  }

  /** Disconnect from pusher. */
  static disconnect(): void {
    Pusher.pusher.disconnect();
  }

  /**
   * Subscribe to a channel.
   *
   * @param name Channel name
   * @returns Channel that got subscribed to
   */
  static subscribe(name: string): Channel {
    return Pusher.pusher.subscribe(name);
  }

  /**
   * Unsubscribe from a channel.
   *
   * @param channel Channel to unsubscribe from
   */
  static unsubscribe(channel: Channel): void {
    Pusher.pusher.unsubscribe(channel.name);
  }
}
