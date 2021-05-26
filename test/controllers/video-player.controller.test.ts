import { EventBus } from './../../src/core/event-bus';
import { VideoPlayerController } from '../../src/controllers/video-player.controller';

describe('VideoPlayerController', () => {
  let videoPlayerController: VideoPlayerController;

  beforeAll(() => {
    videoPlayerController = VideoPlayerController.Instance;
  });

  it('instance should be defined', () => {
    expect(videoPlayerController).toBeDefined();
  });

  describe('destory', () => {
    it('should remove events', () => {
      const eventBus = EventBus.Instance;
      const spy = jest.spyOn(eventBus, 'off');

      videoPlayerController.destory();

      expect(spy).toHaveBeenCalledTimes(4);
    });
  });
});
