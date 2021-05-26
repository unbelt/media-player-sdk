import { EventBus } from '../core/event-bus';
import { MediaPlayerEvent } from '../interfaces/media-player-events';

export class VideoModel {
  private readonly eventBus: EventBus;

  static get Instance(): VideoModel {
    return this.instance || (this.instance = new this());
  }

  private static instance: VideoModel;

  private videoElement!: HTMLVideoElement;

  private constructor() {
    this.eventBus = EventBus.Instance;
  }

  getElement() {
    return this.videoElement;
  }

  setElement(videoElement: HTMLVideoElement) {
    this.videoElement = videoElement;
  }

  setSource(src: string | null) {
    if (!this.videoElement) {
      return;
    }

    if (src) {
      this.eventBus.trigger(MediaPlayerEvent.SOURCE_LOADED);
      this.videoElement.setAttribute('src', src);
    } else {
      this.eventBus.trigger(MediaPlayerEvent.SOURCE_UNLOADED);
      this.videoElement.removeAttribute('src');
    }

    this.videoElement.load();
  }

  play() {
    if (this.videoElement) {
      this.videoElement.play();
      this.eventBus.trigger(MediaPlayerEvent.PLAY);
    }
  }

  pause() {
    if (this.videoElement) {
      this.videoElement.pause();
      this.eventBus.trigger(MediaPlayerEvent.PAUSE);
    }
  }

  isPaused(): boolean | null {
    return this.videoElement?.paused || null;
  }
}
