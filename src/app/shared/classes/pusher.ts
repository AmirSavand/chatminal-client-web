import { User } from '@app/shared/classes/user';
import { ApiService } from '@app/shared/services/api.service';
import { environment } from '@environments/environment';

import { default as PusherJS, Channel, PresenceChannel } from 'pusher-js';
import { Subscription } from 'rxjs';

/** Pusher defined events. */
export enum PusherEvent {
  SUCCESS = 'pusher:subscription_succeeded',
  ERROR = 'pusher:subscription_error',
  MEMBER_ADDED = 'pusher:member_added',
  MEMBER_REMOVED = 'pusher:member_removed',
}

/** Pusher error data on error event data. */
export interface PusherError {
  type: string;
  message: string;
  status: number;
}

/**
 * Handles pusher connecting, pusher disconnecting, chancel
 * subscribing and channel unsubscribe for components.
 */
export class Pusher {

  /** Pusher client instance. */
  private static pusher: PusherJS;

  private static userSubscription: Subscription;

  /**
   * Connect to pusher and set username to user
   * data using the {@see User}.
   */
  static connect(): void {
    /** Subscribe to pusher. */
    Pusher.pusher = new PusherJS(environment.pusherKey, {
      authEndpoint: `${ApiService.BASE}pusher/auth/`,
      auth: { params: { user: User.username } },
      cluster: environment.pusherCluster,
      forceTLS: true,
    });
    /** Subscribe to username changes. */
    Pusher.userSubscription = User.EVENT.subscribe({
      next: (): void => {
        Pusher.pusher.config.auth.params.user = User.username;
      },
    });
  }

  /** Disconnect from pusher. */
  static disconnect(): void {
    Pusher.userSubscription.unsubscribe();
    Pusher.pusher.disconnect();
  }

  /**
   * Subscribe to a channel.
   *
   * @param name Channel name
   * @returns Channel that got subscribed to
   */
  static subscribe(name: string): Channel | PresenceChannel {
    return Pusher.pusher.subscribe(name);
  }

  /**
   * Unsubscribe from a channel.
   *
   * @param channel Channel to unsubscribe from
   */
  static unsubscribe(channel: Channel | PresenceChannel): void {
    Pusher.pusher.unsubscribe(channel.name);
  }
}
