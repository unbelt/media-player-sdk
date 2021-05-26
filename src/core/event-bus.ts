import { EventHandler, EventOptions, EventPriority } from '../interfaces/event';
import { MediaPlayerEvent } from '../interfaces/media-player-events';

export class EventBus {
  static get Instance(): EventBus {
    return this.instance || (this.instance = new this());
  }

  private static instance: EventBus;

  private defaultHandlerOptions: EventOptions = {
    priority: EventPriority.LOW,
  };

  private handlers: { [key: string]: EventHandler[] } = {};

  private constructor() {}

  on(
    eventType: MediaPlayerEvent,
    callback: Function,
    options?: EventOptions
  ): void {
    this.handlers[eventType] = this.handlers[eventType] || [];

    const eventHandler: EventHandler = {
      ...this.defaultHandlerOptions,
      ...options,
      callback,
    };

    const prepended = this.handlers[eventType].some(
      (handler: EventHandler, index: number) => {
        if (handler && eventHandler.priority > handler.priority) {
          this.handlers[eventType].splice(index, 0, eventHandler);
          return true;
        }

        return false;
      }
    );

    if (!prepended) {
      this.handlers[eventType].push(eventHandler);
    }
  }

  off(eventType: MediaPlayerEvent, callback?: Function): void {
    const handler = this.handlers[eventType]?.find(
      (eventHandler: EventHandler) =>
        eventHandler.callback.toString() === callback?.toString() // Compare for non-referenced identical callbacks
    );

    if (!handler) {
      return;
    }

    const index = this.handlers[eventType].indexOf(handler);

    if (index < 0) {
      return;
    }

    delete this.handlers[eventType][index];
  }

  trigger(eventType: MediaPlayerEvent, payload = {}): void {
    this.handlers[eventType]?.map((handler: EventHandler) =>
      handler.callback.call(payload)
    );
  }

  reset(): void {
    this.handlers = {};
  }
}
