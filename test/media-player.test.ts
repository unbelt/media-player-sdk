import { Configuration } from '../src/configuration';
import { MediaPlayer } from '../src/media-player';

describe('MediaPlayer', () => {
  let mediaPlayer: MediaPlayer;
  const config: Partial<Configuration> = {};

  beforeAll(() => {
    mediaPlayer = new MediaPlayer(config);
  });

  it('instance should be defined', () => {
    expect(mediaPlayer).toBeDefined();
  });
});
