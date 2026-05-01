import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { MusicTrack } from '../music-player/music-track.model';
import { S3MusicService } from './s3-music.service';

const STORAGE_VOLUME = 'poochydex_music_volume';
const STORAGE_EXPANDED = 'poochydex_music_expanded';
const STORAGE_FIXED_VISIBLE = 'poochydex_music_fixed_visible';

export type MusicRepeatMode = 'off' | 'all' | 'one';

function createPersistentAudioElement(): HTMLAudioElement {
  if (typeof document === 'undefined') {
    return new Audio();
  }
  const el = document.createElement('audio');
  el.preload = 'metadata';
  el.setAttribute('playsinline', '');
  el.setAttribute('webkit-playsinline', '');
  el.setAttribute('aria-hidden', 'true');
  Object.assign(el.style, {
    position: 'fixed',
    width: '0',
    height: '0',
    opacity: '0',
    pointerEvents: 'none',
    zIndex: '-1'
  });
  const append = () => {
    if (el.parentElement !== document.body) {
      document.body.appendChild(el);
    }
  };
  if (document.body) {
    append();
  } else {
    document.addEventListener('DOMContentLoaded', append, { once: true });
  }
  return el;
}

/**
 * Offline music playback using a single HTMLAudioElement. Playlist is bundled / local assets.
 * Audio stays in the document and uses the Media Session API so playback survives SPA navigation
 * and behaves better when switching apps (OS permitting).
 */
@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  private readonly audio = createPersistentAudioElement();
  private tracks: MusicTrack[] = [];
  private currentIndex = 0;
  private shuffleQueue: number[] = [];
  private shuffleQueuePos = 0;
  /** True if playback was active before the tab/app went to background (some browsers pause HTML audio). */
  private shouldResumeAfterHidden = false;

  private readonly currentTrackSubject = new BehaviorSubject<MusicTrack | null>(null);
  private readonly isPlayingSubject = new BehaviorSubject<boolean>(false);
  private readonly currentTimeSubject = new BehaviorSubject<number>(0);
  private readonly durationSubject = new BehaviorSubject<number>(0);
  private readonly volumeSubject = new BehaviorSubject<number>(0.75);
  private readonly repeatModeSubject = new BehaviorSubject<MusicRepeatMode>('all');
  private readonly shuffleSubject = new BehaviorSubject<boolean>(false);
  private readonly isExpandedSubject = new BehaviorSubject<boolean>(true);
  /** Floating player visible (always-on-screen can be toggled off). */
  private readonly fixedVisibleSubject = new BehaviorSubject<boolean>(true);
  private readonly isLoadingTracksSubject = new BehaviorSubject<boolean>(false);

  readonly currentTrack$: Observable<MusicTrack | null> = this.currentTrackSubject.asObservable();
  readonly isPlaying$: Observable<boolean> = this.isPlayingSubject.asObservable();
  readonly currentTime$: Observable<number> = this.currentTimeSubject.asObservable();
  readonly duration$: Observable<number> = this.durationSubject.asObservable();
  readonly volume$: Observable<number> = this.volumeSubject.asObservable();
  readonly repeatMode$: Observable<MusicRepeatMode> = this.repeatModeSubject.asObservable();
  readonly shuffle$: Observable<boolean> = this.shuffleSubject.asObservable();
  readonly isExpanded$: Observable<boolean> = this.isExpandedSubject.asObservable();
  readonly fixedVisible$: Observable<boolean> = this.fixedVisibleSubject.asObservable();
  readonly isLoadingTracks$: Observable<boolean> = this.isLoadingTracksSubject.asObservable();

  get hasTracks(): boolean {
    return this.tracks.length > 0;
  }

  /** Tracks in current play order: shuffled queue order when shuffle is on, original otherwise. */
  get playlistOrder(): readonly MusicTrack[] {
    if (this.shuffleSubject.value && this.shuffleQueue.length === this.tracks.length) {
      return this.shuffleQueue.map(i => this.tracks[i]);
    }
    return this.tracks;
  }

  /** Index of the current track within `playlistOrder`. */
  get currentPlaylistIndex(): number {
    if (this.shuffleSubject.value && this.shuffleQueue.length > 0) {
      return this.shuffleQueuePos;
    }
    return this.currentIndex;
  }

  /** Select a track by its position in `playlistOrder` (handles shuffle mapping). */
  selectFromPlaylist(playlistPos: number, autoplay: boolean): void {
    if (this.shuffleSubject.value && this.shuffleQueue.length === this.tracks.length) {
      this.shuffleQueuePos = playlistPos;
      this.selectTrack(this.shuffleQueue[playlistPos], autoplay);
    } else {
      this.selectTrack(playlistPos, autoplay, true);
    }
  }

  constructor(private s3Music: S3MusicService) {
    this.restoreUiState();
    this.applyVolumeFromStorage();
    this.setupMediaSession();
    this.setupVisibilityResume();
    void this.loadTracksFromS3();

    this.audio.addEventListener('timeupdate', () => {
      this.currentTimeSubject.next(this.audio.currentTime || 0);
    });
    this.audio.addEventListener('loadedmetadata', () => {
      this.durationSubject.next(Number.isFinite(this.audio.duration) ? this.audio.duration : 0);
    });
    this.audio.addEventListener('ended', () => this.onEnded());
    this.audio.addEventListener('play', () => {
      this.isPlayingSubject.next(true);
      this.updateMediaSessionPlaybackState();
    });
    this.audio.addEventListener('pause', () => {
      this.isPlayingSubject.next(false);
      this.updateMediaSessionPlaybackState();
    });

    if (this.hasTracks) {
      this.selectTrack(0, false);
    }
  }

  async loadTracksFromS3(prefix?: string): Promise<void> {
    this.isLoadingTracksSubject.next(true);
    try {
      const s3Tracks = await firstValueFrom(this.s3Music.listAudioTracks(prefix));
      if (s3Tracks.length > 0) {
        this.tracks = s3Tracks;
        this.currentIndex = 0;
        this.currentTrackSubject.next(null);
        if (this.shuffleSubject.value && s3Tracks.length > 1) {
          this.buildShuffleQueue();
        }
        this.selectTrack(0, false);
      }
    } catch (e) {
      console.warn('MusicPlayerService: failed to load S3 tracks, keeping offline playlist', e);
    } finally {
      this.isLoadingTracksSubject.next(false);
    }
  }

  get currentIndexValue(): number {
    return this.currentIndex;
  }

  get tracksSnapshot(): readonly MusicTrack[] {
    return this.tracks;
  }

  toggleFixedVisible(): void {
    const next = !this.fixedVisibleSubject.value;
    this.fixedVisibleSubject.next(next);
    try {
      localStorage.setItem(STORAGE_FIXED_VISIBLE, next ? '1' : '0');
    } catch {
      /* ignore */
    }
  }

  setExpanded(expanded: boolean): void {
    this.isExpandedSubject.next(expanded);
    try {
      localStorage.setItem(STORAGE_EXPANDED, expanded ? '1' : '0');
    } catch {
      /* ignore */
    }
  }

  toggleExpanded(): void {
    this.setExpanded(!this.isExpandedSubject.value);
  }

  toggleShuffle(): void {
    const next = !this.shuffleSubject.value;
    this.shuffleSubject.next(next);
    if (next && this.tracks.length > 1) {
      this.buildShuffleQueue();
    }
  }

  cycleRepeatMode(): void {
    const order: MusicRepeatMode[] = ['off', 'all', 'one'];
    const i = order.indexOf(this.repeatModeSubject.value);
    this.repeatModeSubject.next(order[(i + 1) % order.length]);
  }

  togglePlay(): void {
    if (!this.hasTracks) {
      return;
    }
    if (this.isPlayingSubject.value) {
      this.pause();
    } else {
      void this.play();
    }
  }

  async play(): Promise<void> {
    if (!this.hasTracks) {
      return;
    }
    try {
      await this.audio.play();
      this.syncMediaSessionMetadata();
    } catch (e) {
      console.warn('MusicPlayerService: play failed', e);
    }
  }

  pause(): void {
    this.audio.pause();
  }

  next(): void {
    if (!this.hasTracks) {
      return;
    }
    if (this.shuffleSubject.value && this.tracks.length > 1) {
      this.shuffleQueuePos++;
      if (this.shuffleQueuePos >= this.shuffleQueue.length) {
        this.buildShuffleQueue();
        this.shuffleQueuePos = this.tracks.length > 1 ? 1 : 0;
      }
      this.selectTrack(this.shuffleQueue[this.shuffleQueuePos], true);
      return;
    }
    this.selectTrack((this.currentIndex + 1) % this.tracks.length, true);
  }

  previous(): void {
    if (!this.hasTracks) {
      return;
    }
    if (this.shuffleSubject.value && this.tracks.length > 1) {
      this.shuffleQueuePos = Math.max(0, this.shuffleQueuePos - 1);
      this.selectTrack(this.shuffleQueue[this.shuffleQueuePos], true);
      return;
    }
    this.selectTrack((this.currentIndex - 1 + this.tracks.length) % this.tracks.length, true);
  }

  private buildShuffleQueue(): void {
    const rest = Array.from({ length: this.tracks.length }, (_, i) => i)
      .filter(i => i !== this.currentIndex);
    for (let i = rest.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rest[i], rest[j]] = [rest[j], rest[i]];
    }
    this.shuffleQueue = [this.currentIndex, ...rest];
    this.shuffleQueuePos = 0;
  }

  selectTrack(index: number, autoplay: boolean, rebuildShuffle = false): void {
    if (!this.hasTracks || index < 0 || index >= this.tracks.length) {
      return;
    }
    this.currentIndex = index;
    if (rebuildShuffle && this.shuffleSubject.value && this.tracks.length > 1) {
      this.buildShuffleQueue();
    }
    const track = this.tracks[index];
    this.currentTrackSubject.next(track);
    this.audio.pause();
    this.currentTimeSubject.next(0);
    this.syncMediaSessionMetadata();

    if (track.s3Key) {
      void this.loadS3SrcAndPlay(track, index, autoplay);
    } else {
      this.audio.src = track.src;
      this.audio.load();
      if (autoplay) {
        void this.play();
      } else {
        this.isPlayingSubject.next(false);
      }
    }
  }

  private async loadS3SrcAndPlay(track: MusicTrack, index: number, autoplay: boolean): Promise<void> {
    try {
      const url = await firstValueFrom(this.s3Music.getPresignedUrl(track.s3Key!));
      track.src = url;
      if (this.currentIndex !== index) {
        return;
      }
      this.audio.src = url;
      this.audio.load();
      if (autoplay) {
        void this.play();
      } else {
        this.isPlayingSubject.next(false);
      }
    } catch (e) {
      console.warn('MusicPlayerService: could not get presigned URL for', track.s3Key, e);
    }
  }

  setVolume(value: number): void {
    const v = Math.max(0, Math.min(1, value));
    this.audio.volume = v;
    this.volumeSubject.next(v);
    try {
      localStorage.setItem(STORAGE_VOLUME, String(v));
    } catch {
      /* ignore */
    }
  }

  seekRatio(ratio: number): void {
    const r = Math.max(0, Math.min(1, ratio));
    const d = this.durationSubject.value;
    if (d > 0 && Number.isFinite(d)) {
      this.audio.currentTime = r * d;
    }
  }

  private onEnded(): void {
    const mode = this.repeatModeSubject.value;
    if (mode === 'one') {
      this.audio.currentTime = 0;
      void this.play();
      return;
    }
    if (this.currentIndex >= this.tracks.length - 1 && mode === 'off') {
      this.pause();
      return;
    }
    this.next();
  }

  private applyVolumeFromStorage(): void {
    try {
      const raw = localStorage.getItem(STORAGE_VOLUME);
      if (raw !== null) {
        const v = parseFloat(raw);
        if (!Number.isNaN(v)) {
          this.setVolume(v);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    this.setVolume(this.volumeSubject.value);
  }

  private restoreUiState(): void {
    try {
      const ex = localStorage.getItem(STORAGE_EXPANDED);
      if (ex !== null) {
        this.isExpandedSubject.next(ex === '1');
      }
      const vis = localStorage.getItem(STORAGE_FIXED_VISIBLE);
      if (vis !== null) {
        this.fixedVisibleSubject.next(vis === '1');
      }
    } catch {
      /* ignore */
    }
  }

  private setupMediaSession(): void {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) {
      return;
    }
    try {
      navigator.mediaSession.setActionHandler('play', () => {
        void this.play();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        this.pause();
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        this.previous();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        this.next();
      });
    } catch {
      /* Some platforms throw if an action is unsupported */
    }
  }

  private syncMediaSessionMetadata(): void {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) {
      return;
    }
    const track = this.tracks[this.currentIndex];
    if (!track) {
      return;
    }
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist ?? 'PoochyDex',
        album: 'PoochyDex'
      });
    } catch {
      /* ignore */
    }
  }

  private updateMediaSessionPlaybackState(): void {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) {
      return;
    }
    try {
      navigator.mediaSession.playbackState = this.audio.paused ? 'paused' : 'playing';
    } catch {
      /* ignore */
    }
  }

  /**
   * Many mobile browsers pause &lt;audio&gt; when the tab or WebView loses focus.
   * Resume if playback was intended to continue (user did not press pause).
   */
  private setupVisibilityResume(): void {
    if (typeof document === 'undefined') {
      return;
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.shouldResumeAfterHidden = !this.audio.paused;
        return;
      }
      if (this.shouldResumeAfterHidden && this.hasTracks && this.audio.paused) {
        void this.play();
      }
      this.shouldResumeAfterHidden = false;
    });

    window.addEventListener('pagehide', () => {
      this.shouldResumeAfterHidden = !this.audio.paused;
    });

    window.addEventListener('pageshow', (event) => {
      if (event.persisted && this.shouldResumeAfterHidden && this.hasTracks && this.audio.paused) {
        void this.play();
      }
    });
  }
}
