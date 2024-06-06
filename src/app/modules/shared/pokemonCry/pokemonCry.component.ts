import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Pokemon } from '../../../../../entities/pokemon.entity';

@Component({
  selector: 'app-pokemonCry',
  templateUrl: './pokemonCry.component.html',
  styleUrls: ['./pokemonCry.component.scss']
})
export class PokemonCryComponent implements OnInit, OnChanges {
  @Input() pokemon: Pokemon;
  @Input() language: string = 'es';
  @ViewChild('audioPlayerLatest', { static: false }) audioPlayerLatest: ElementRef<HTMLAudioElement>;
  @ViewChild('audioPlayerLegacy', { static: false }) audioPlayerLegacy: ElementRef<HTMLAudioElement>;

  isPlayingLatest: boolean = false;
  isPlayingLegacy: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemon'] && changes['pokemon'].currentValue) {
      this.updateAudioSource();
    }
  }

  updateAudioSource() {
    if (this.audioPlayerLatest && this.audioPlayerLatest.nativeElement) {
      this.audioPlayerLatest.nativeElement.pause();
      this.audioPlayerLatest.nativeElement.load();
      this.isPlayingLatest = false; // Reseteamos el estado a no reproducir
    }
    if (this.audioPlayerLegacy && this.audioPlayerLegacy.nativeElement) {
      this.audioPlayerLegacy.nativeElement.pause();
      this.audioPlayerLegacy.nativeElement.load();
      this.isPlayingLegacy = false; // Reseteamos el estado a no reproducir
    }
  }

  playAudio(player: string) {
    if (player === 'latest' && this.audioPlayerLatest && this.audioPlayerLatest.nativeElement) {
      this.audioPlayerLatest.nativeElement.play();
      this.isPlayingLatest = true;
    } else if (player === 'legacy' && this.audioPlayerLegacy && this.audioPlayerLegacy.nativeElement) {
      this.audioPlayerLegacy.nativeElement.play();
      this.isPlayingLegacy = true;
    }
  }

  pauseAudio(player: string) {
    if (player === 'latest' && this.audioPlayerLatest && this.audioPlayerLatest.nativeElement) {
      this.audioPlayerLatest.nativeElement.pause();
      this.isPlayingLatest = false;
    } else if (player === 'legacy' && this.audioPlayerLegacy && this.audioPlayerLegacy.nativeElement) {
      this.audioPlayerLegacy.nativeElement.pause();
      this.isPlayingLegacy = false;
    }
  }

  audioEnded(player: string) {
    if (player === 'latest') {
      this.isPlayingLatest = false;
    } else if (player === 'legacy') {
      this.isPlayingLegacy = false;
    }
  }

}
