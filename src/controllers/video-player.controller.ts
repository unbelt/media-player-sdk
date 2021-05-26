import { MediaPlayerEvent } from '../interfaces/media-player-events';
import { VideoModel } from '../models/video.model';
import { BaseController } from './base.controller';

/**
 * Controller for the Video element
 */
export class VideoPlayerController extends BaseController {
  static get Instance(): VideoPlayerController {
    return this._instance || (this._instance = new this());
  }

  private static _instance: VideoPlayerController;

  private videoModel: VideoModel | null;

  private constructor() {
    super();

    this.videoModel = VideoModel.Instance;
  }

  setSource(src: string | null): void {
    this.videoModel?.setSource(src);
  }

  play(): void {
    this.videoModel?.play();
  }

  pause(): void {
    this.videoModel?.pause();
  }

  destory(): void {
    if (this.videoModel) {
      this.eventBus.off(MediaPlayerEvent.SOURCE_LOADED);
      this.eventBus.off(MediaPlayerEvent.SOURCE_UNLOADED);
      this.eventBus.off(MediaPlayerEvent.PLAY);
      this.eventBus.off(MediaPlayerEvent.PAUSE);

      this.videoModel = null;
    }
  }
}
