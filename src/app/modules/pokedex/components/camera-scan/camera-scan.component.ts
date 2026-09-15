import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';
import { Pokemon } from '../../../../../../entities/pokemon.entity';
import { PokemonRecognitionResult } from '../../../../../../entities/pokemon-recognition.entity';
import { detailFadeInAnimations } from 'app/modules/shared/animations/detail-fade-in.animation';
import { ErrorMessageService } from 'app/services/error-message.service';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { PokeApiService } from 'app/modules/shared/services/poke-api.service';
import { PokemonRecognitionService } from 'app/modules/shared/services/pokemon-recognition.service';

type ScanStep = 'capture' | 'preview' | 'identifying' | 'result';

@Component({
    selector: 'app-camera-scan',
    templateUrl: './camera-scan.component.html',
    styleUrls: ['./camera-scan.component.scss'],
    animations: detailFadeInAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CameraScanComponent implements OnInit {
  private languageService = inject(LanguageService);
  private recognitionService = inject(PokemonRecognitionService);
  private pokeApiService = inject(PokeApiService);
  private errorMessageService = inject(ErrorMessageService);
  private destroyRef = inject(DestroyRef);

  language: string;
  step: ScanStep = 'capture';

  capturedImage: string | null = null;
  recognition: PokemonRecognitionResult | null = null;
  recognizedPokemon: Pokemon | null = null;

  ngOnInit(): void {
    this.languageService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(language => this.language = language);
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';

    if (!file || !file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.capturedImage = reader.result as string;
      this.step = 'preview';
    };
    reader.readAsDataURL(file);
  }

  identify(): void {
    if (!this.capturedImage) {
      return;
    }
    this.step = 'identifying';

    this.recognitionService.identifyPokemon(this.capturedImage)
      .pipe(
        switchMap(recognition => {
          this.recognition = recognition;
          return this.pokeApiService.getPokemonByName(recognition.pokemonName);
        }),
        catchError(error => {
          this.errorMessageService.showError(
            this.language === 'es'
              ? 'No pudimos identificar al Pokémon. Intenta de nuevo.'
              : "We couldn't identify the Pokémon. Please try again.",
            error?.message ?? ''
          );
          this.step = 'preview';
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(pokemon => {
        if (!pokemon) {
          return;
        }
        this.recognizedPokemon = pokemon;
        this.step = 'result';
      });
  }

  retake(): void {
    this.capturedImage = null;
    this.recognition = null;
    this.recognizedPokemon = null;
    this.step = 'capture';
  }

  confidencePercent(confidence: number): number {
    return Math.round(confidence * 100);
  }

  get recognizedSpriteUrl(): string | null {
    const sprites = this.recognizedPokemon?.sprites;
    return sprites?.other?.['official-artwork']?.front_default ?? sprites?.front_default ?? null;
  }
}
