export class ManifestLoader {
  static get Instance(): ManifestLoader {
    return this._instance || (this._instance = new this());
  }

  private static _instance: ManifestLoader;

  private constructor() {}

  load(uri: string): any {
    // Logic for parsing the manifest
  }
}
