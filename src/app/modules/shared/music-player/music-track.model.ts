export interface MusicTrack {
  title: string;
  /** Relative to app root, e.g. assets/audio/theme.ogg */
  src: string;
  artist?: string;
}
