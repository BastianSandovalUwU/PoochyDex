import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ALL_POKEMON } from '../../../../../entities/common/const.interface';
import { PokemonRecognitionResult } from '../../../../../entities/pokemon-recognition.entity';

/**
 * Backend endpoint for photo recognition doesn't exist yet.
 * Flip this to `false` once POST {nodeJsApi}/api/pokemon-recognition/identify
 * is live (contract documented in docs/api-services.md) — the calling code
 * does not need to change.
 */
const MOCK_RECOGNITION = true;

@Injectable({ providedIn: 'root' })
export class PokemonRecognitionService {
  private http = inject(HttpClient);
  private apiUrl = environment.nodeJsApi;

  identifyPokemon(imageDataUrl: string): Observable<PokemonRecognitionResult> {
    if (MOCK_RECOGNITION) {
      return this.mockIdentify();
    }
    return this.http.post<PokemonRecognitionResult>(
      `${this.apiUrl}/api/pokemon-recognition/identify`,
      { image: imageDataUrl }
    );
  }

  private mockIdentify(): Observable<PokemonRecognitionResult> {
    const shuffled = [...ALL_POKEMON].sort(() => Math.random() - 0.5).slice(0, 3);
    const topConfidence = 0.75 + Math.random() * 0.24;

    const candidates = shuffled.map((pokemon, index) => ({
      pokemonName: pokemon.name,
      confidence: Math.max(topConfidence - index * (0.15 + Math.random() * 0.1), 0.01),
    }));

    const result: PokemonRecognitionResult = {
      pokemonName: candidates[0].pokemonName,
      confidence: candidates[0].confidence,
      candidates,
    };

    // Simulated network latency so the UI's loading state feels real.
    return of(result).pipe(delay(1500));
  }
}
