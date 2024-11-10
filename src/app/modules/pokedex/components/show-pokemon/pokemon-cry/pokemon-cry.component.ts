import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Pokemon } from '../../../../../../../entities/pokemon.entity';

@Component({
  selector: 'app-pokemon-cry',
  templateUrl: './pokemon-cry.component.html',
  styleUrls: ['./pokemon-cry.component.scss']
})
export class PokemonCryComponent implements OnInit, OnChanges {
  @Input() pokemon: Pokemon;
  @Input() language: string;
  @ViewChild('audioPlayerLatest', { static: false }) audioPlayerLatest: ElementRef<HTMLAudioElement>;
  @ViewChild('audioPlayerLegacy', { static: false }) audioPlayerLegacy: ElementRef<HTMLAudioElement>;

  isPlayingLatest: boolean = false;
  isPlayingLegacy: boolean = false;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemon'] && changes['pokemon'].currentValue) {
      this.updateAudioSource();
    }
  }

  updateAudioSource() {
    this.resetAudio(this.audioPlayerLatest);
    this.resetAudio(this.audioPlayerLegacy);
  }

  private resetAudio(player: ElementRef<HTMLAudioElement>) {
    if (player && player.nativeElement) {
      player.nativeElement.pause();
      player.nativeElement.currentTime = 0;
      player.nativeElement.load();
    }
  }

  playAudio(player: string) {
    let audioElement: HTMLAudioElement;

    if (player === 'latest' && this.audioPlayerLatest) {
      audioElement = this.audioPlayerLatest.nativeElement;
      this.isPlayingLatest = true;
    } else if (player === 'legacy' && this.audioPlayerLegacy) {
      audioElement = this.audioPlayerLegacy.nativeElement;
      this.isPlayingLegacy = true;
    }

    if (audioElement) {
      audioElement.play().catch(() => {
        this.resetPlayStatus(player);
      });
    }
  }

  pauseAudio(player: string) {
    if (player === 'latest' && this.audioPlayerLatest) {
      this.audioPlayerLatest.nativeElement.pause();
      this.isPlayingLatest = false;
    } else if (player === 'legacy' && this.audioPlayerLegacy) {
      this.audioPlayerLegacy.nativeElement.pause();
      this.isPlayingLegacy = false;
    }
  }

  audioEnded(player: string) {
    this.resetPlayStatus(player);
  }

  private resetPlayStatus(player: string) {
    if (player === 'latest') {
      this.isPlayingLatest = false;
    } else if (player === 'legacy') {
      this.isPlayingLegacy = false;
    }
  }
}
