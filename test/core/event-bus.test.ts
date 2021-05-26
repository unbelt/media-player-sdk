import { EventBus } from '../../src/core/event-bus';
import { MediaPlayerEvent } from '../../src/interfaces/media-player-events';
import 'jest-extended';

describe('EventBus', () => {
  let eventBus: EventBus;

  beforeAll(() => {
    eventBus = EventBus.Instance;
  });

  beforeEach(() => {
    eventBus.reset();
  });

  it('instance should be defined', () => {
    expect(eventBus).toBeDefined();
  });

  describe('on', () => {
    it('should register event', () => {
      const callback = jest.fn();

      eventBus.on(MediaPlayerEvent.PLAY, callback);
      eventBus.trigger(MediaPlayerEvent.PLAY);

      expect(callback).toHaveBeenCalled();
    });
  });

  describe('off', () => {
    it('should remove event', () => {
      const callback = jest.fn();

      eventBus.on(MediaPlayerEvent.PLAY, callback);
      eventBus.off(MediaPlayerEvent.PLAY, callback);

      eventBus.trigger(MediaPlayerEvent.PLAY);

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('trigger', () => {
    it('should not trigger event if not found', () => {
      const callback = jest.fn();

      eventBus.on(MediaPlayerEvent.PLAY, callback);
      eventBus.trigger(MediaPlayerEvent.PAUSE);

      expect(callback).not.toHaveBeenCalled();
    });

    it('should trigger events according to priority', () => {
      const callbackOne = jest.fn();
      const callbackTwo = jest.fn();

      eventBus.on(MediaPlayerEvent.PLAY, callbackTwo, { priority: 2 });
      eventBus.on(MediaPlayerEvent.PLAY, callbackOne, { priority: 1 });

      eventBus.trigger(MediaPlayerEvent.PLAY);

      expect(callbackOne).toHaveBeenCalledTimes(1);
      expect(callbackTwo).toHaveBeenCalledTimes(1);
      expect(callbackTwo).toHaveBeenCalledBefore(callbackOne);
    });
  });

  describe('reset', () => {
    it('should not trigger event after reset', () => {
      const callback = jest.fn();

      eventBus.on(MediaPlayerEvent.PLAY, callback);
      eventBus.reset();
      eventBus.trigger(MediaPlayerEvent.PLAY);

      expect(callback).not.toHaveBeenCalled();
    });
  });
});
