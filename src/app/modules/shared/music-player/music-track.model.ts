export interface MusicTrack {
  title: string;
  /** Relative to app root or presigned S3 URL */
  src: string;
  artist?: string;
  /** S3 object key; present only for tracks loaded from S3 */
  s3Key?: string;
}
