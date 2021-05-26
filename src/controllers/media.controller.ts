import { BaseController } from './base.controller';

export class MediaController extends BaseController {
  static get Instance(): MediaController {
    return this._instance || (this._instance = new this());
  }

  private static _instance: MediaController;

  createSource(): MediaSource {
    return new MediaSource();
  }
}
