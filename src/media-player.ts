import { VideoModel } from './models/video.model';
import { EventBus } from './core/event-bus';
import { VideoPlayerController } from './controllers/video-player.controller';
import { Configuration, DEFAULT_CONFIGURATION } from './configuration';
import { ManifestLoader } from './core/manifest-loader';
import { MediaPlayerEvent } from './interfaces/media-player-events';
import { EventOptions } from './interfaces/event';

export class MediaPlayer {
  private readonly config: Readonly<Configuration>;
  private readonly videoPlayerController: VideoPlayerController;
  private readonly eventBus: EventBus;
  private readonly manifestLoader: ManifestLoader;
  private readonly videoModel: VideoModel;

  constructor(config?: Partial<Configuration>) {
    this.config = {
      ...DEFAULT_CONFIGURATION,
      ...config,
    };

    this.videoPlayerController = VideoPlayerController.Instance;
    this.eventBus = EventBus.Instance;
    this.manifestLoader = ManifestLoader.Instance;
    this.videoModel = VideoModel.Instance;
  }

  /**
   * Plays the media
   */
  play(): void {
    if (!this.isPlaying()) {
      this.videoPlayerController.play();
    }
  }

  /**
   * Pauses the media
   */
  pause(): void {
    this.videoModel.pause();
  }

  /**
   * Returns the media duration
   * @returns {number}
   */
  getDuration(): number {
    // TODO: Get duration from the player model
    return 0;
  }

  /**
   * Returns current time of the media
   * @returns {number}
   */
  getCurrentTime(): number {
    // TODO: Get current time from the player model
    return 0;
  }

  /**
   * Loads the media
   * @param {string} src
   */
  load(src: string): void {
    const source = this.manifestLoader.load(src);
    this.videoPlayerController.setSource(source);
  }

  /**
   * Unloads the media
   */
  unload(): void {
    this.videoPlayerController.setSource(null);
  }

  /**
   * Register an event
   * @param {MediaPlayerEvent} eventType
   * @param {Function} callback
   * @param {EventOptions?} options
   */
  on(
    eventType: MediaPlayerEvent,
    callback: Function,
    options?: EventOptions
  ): void {
    this.eventBus.on(eventType, callback, options);
  }

  /**
   * Removes an event registration
   * @param {MediaPlayerEvent} eventType
   * @param {Function} callback
   */
  off(eventType: MediaPlayerEvent, callback: Function): void {
    this.eventBus.off(eventType, callback);
  }

  /**
   * Returns if the media is playing
   * @returns {boolean}
   */
  isPlaying(): boolean {
    // TODO: Get playing status from the player model
    return false;
  }

  /**
   * Returns if the media is paused
   * @returns {boolean}
   */
  isPaused(): boolean {
    return !!this.videoModel.isPaused();
  }

  /**
   * Returns if the media is ready
   * @returns {boolean}
   */
  isReady(): boolean {
    return !!this.videoModel.getElement();
  }

  /**
   * Returns if the media is loaded
   * @returns {boolean}
   */
  isLoaded(): boolean {
    // TODO: Get loaded status from the player model
    return false;
  }

  /**
   * Destroys the media
   */
  destroy(): void {
    this.videoPlayerController.destory();
  }
}
