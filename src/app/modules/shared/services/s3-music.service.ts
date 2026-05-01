import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'environments/environment';
import { MusicTrack } from '../music-player/music-track.model';

interface S3Object {
  Key: string;
  Size?: number;
  LastModified?: string;
}

interface ListResponse {
  success: boolean;
  data: { objects: S3Object[]; count: number; isTruncated: boolean };
}

interface PresignedResponse {
  success: boolean;
  data: { url: string; expiresIn: number };
}

const AUDIO_EXTENSIONS = /\.(mp3|ogg|wav|flac|aac|m4a)$/i;

function keyToTitle(key: string): string {
  const filename = key.split('/').pop() ?? key;
  return filename.replace(AUDIO_EXTENSIONS, '');
}

@Injectable({ providedIn: 'root' })
export class S3MusicService {
  private readonly base = environment.nodeJsApi;

  constructor(private http: HttpClient) {}

  listAudioTracks(prefix?: string): Observable<MusicTrack[]> {
    const params: Record<string, string> = {};
    if (prefix) {
      params['prefix'] = prefix;
    }
    return this.http
      .get<ListResponse>(`${this.base}/api/s3/list`, { params })
      .pipe(
        map((res) =>
          (res.data.objects ?? [])
            .filter((obj) => AUDIO_EXTENSIONS.test(obj.Key))
            .map((obj) => ({
              title: keyToTitle(obj.Key),
              src: '',
              s3Key: obj.Key,
            }))
        )
      );
  }

  getPresignedUrl(key: string, expiresIn = 3600): Observable<string> {
    const encodedKey = key.split('/').map(encodeURIComponent).join('/');
    return this.http
      .get<PresignedResponse>(`${this.base}/api/s3/presigned/${encodedKey}`, {
        params: { expires: String(expiresIn) },
      })
      .pipe(map((res) => res.data.url));
  }
}
