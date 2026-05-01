import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { MusicPlayerService, MusicRepeatMode } from '../services/music-player.service';
import { MusicTrack } from './music-track.model';

const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
  animations: [
    trigger('musicDock', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(1.25rem)' }),
        animate(`280ms ${EASE_OUT}`, style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate(`240ms ${EASE_IN}`, style({ opacity: 0, transform: 'translateY(0.75rem)' }))
      ])
    ]),
    trigger('musicFab', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.88)' }),
        animate(`220ms ${EASE_OUT}`, style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate(`180ms ${EASE_IN}`, style({ opacity: 0, transform: 'scale(0.88)' }))
      ])
    ])
  ]
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  /** When true, the player is fixed above the fold (e.g. shell). When false, host controls layout via class. */
  @Input() fixedLayout = true;

  language = 'es';
  hasTracks = false;
  isLoadingTracks = false;
  currentTrack: MusicTrack | null = null;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 0.75;
  repeatMode: MusicRepeatMode = 'all';
  shuffle = false;
  isExpanded = true;
  fixedVisible = true;
  showPlaylist = false;
  playlistTracks: readonly MusicTrack[] = [];
  playlistCurrentIndex = 0;

  repeatModeLabel = '';

  private destroy$ = new Subject<void>();

  constructor(
    public music: MusicPlayerService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.hasTracks = this.music.hasTracks;

    this.music.isLoadingTracks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.isLoadingTracks = loading;
        this.hasTracks = this.music.hasTracks;
      });

    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe((lang) => {
        this.language = lang;
        this.updateRepeatLabel();
      });

    this.music.currentTrack$
      .pipe(takeUntil(this.destroy$))
      .subscribe((t) => {
        this.currentTrack = t;
        this.refreshPlaylist();
      });

    this.music.isPlaying$
      .pipe(takeUntil(this.destroy$))
      .subscribe((p) => (this.isPlaying = p));

    this.music.currentTime$
      .pipe(takeUntil(this.destroy$))
      .subscribe((t) => (this.currentTime = t));

    this.music.duration$
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => (this.duration = d));

    this.music.volume$
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => (this.volume = v));

    this.music.repeatMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe((m) => {
        this.repeatMode = m;
        this.updateRepeatLabel();
      });

    this.music.shuffle$
      .pipe(takeUntil(this.destroy$))
      .subscribe((s) => {
        this.shuffle = s;
        this.refreshPlaylist();
      });

    this.music.isLoadingTracks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.isLoadingTracks = loading;
        this.hasTracks = this.music.hasTracks;
        this.refreshPlaylist();
      });

    this.music.isExpanded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => (this.isExpanded = e));

    this.music.fixedVisible$
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => (this.fixedVisible = v));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private refreshPlaylist(): void {
    this.playlistTracks = this.music.playlistOrder;
    this.playlistCurrentIndex = this.music.currentPlaylistIndex;
  }

  formatTime(seconds: number): string {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return '0:00';
    }
    const s = Math.floor(seconds % 60);
    const m = Math.floor(seconds / 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  progressPercent(): number {
    if (!this.duration || this.duration <= 0) {
      return 0;
    }
    return Math.min(100, (this.currentTime / this.duration) * 100);
  }

  onProgressClick(event: MouseEvent, bar: HTMLElement): void {
    if (!this.duration || this.duration <= 0) {
      return;
    }
    const rect = bar.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    this.music.seekRatio(ratio);
  }

  /** Keyboard seek for progress bar (same element as click; satisfies a11y lint). */
  onProgressBarKeydown(event: KeyboardEvent, _bar: HTMLElement): void {
    if (!this.duration || this.duration <= 0) {
      return;
    }
    const step = 0.05;
    const ratio = this.currentTime / this.duration;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.music.seekRatio(Math.max(0, ratio - step));
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.music.seekRatio(Math.min(1, ratio + step));
    }
  }

  onVolumeInputEvent(event: Event): void {
    const v = parseFloat((event.target as HTMLInputElement).value);
    if (!Number.isNaN(v)) {
      this.music.setVolume(v);
    }
  }

  trackTitle(track: MusicTrack | null): string {
    if (!track) {
      return this.language === 'es' ? 'Sin pista' : 'No track';
    }
    return track.artist ? `${track.title} — ${track.artist}` : track.title;
  }

  emptyHint(): string {
    return this.language === 'es'
      ? 'Cargando lista de reproducción…'
      : 'Loading playlist…';
  }

  private updateRepeatLabel(): void {
    const es = this.language === 'es';
    switch (this.repeatMode) {
      case 'off':
        this.repeatModeLabel = es ? 'Sin repetición' : 'Repeat off';
        break;
      case 'all':
        this.repeatModeLabel = es ? 'Repetir lista' : 'Repeat playlist';
        break;
      case 'one':
        this.repeatModeLabel = es ? 'Repetir una' : 'Repeat one';
        break;
    }
  }
}
