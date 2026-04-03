import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { forkJoin, map } from 'rxjs';
import { PokeApiService } from './pokeApi.service';
import { PoochyDexApiService } from 'app/modules/poochyDexApi/services/poochyDexApi.service';
import { CustomPokemonCatalogService } from './custom-pokemon-catalog.service';

/**
 * Builds and tracks the local PokéAPI Pokémon cache (localStorage batching).
 */
@Injectable({
  providedIn: 'root'
})
export class PokemonCacheService {
  private cacheLoadingProgress = new BehaviorSubject<number>(0);
  private isCacheLoading = new BehaviorSubject<boolean>(false);

  readonly cacheLoadingProgress$ = this.cacheLoadingProgress.asObservable();
  readonly isCacheLoading$ = this.isCacheLoading.asObservable();

  constructor(
    private pokeApiService: PokeApiService,
    private poochyDexApiService: PoochyDexApiService,
    private catalog: CustomPokemonCatalogService
  ) {}

  createAllPokemonCache(): void {
    console.log('Checking Pokémon cache...');

    if (!this.catalog.allPokemon || this.catalog.allPokemon.length === 0) {
      console.log('allPokemon not loaded from Node API yet; loading before building cache...');
      this.poochyDexApiService.getAllPokemon().subscribe({
        next: (response) => {
          this.catalog.allPokemon = response.data || [];
          console.log(`allPokemon loaded (${this.catalog.allPokemon.length} rows), retrying cache build...`);
          this.createAllPokemonCache();
        },
        error: (error) => {
          console.error('Error loading allPokemon for cache:', error);
        }
      });
      return;
    }

    const cache = localStorage.getItem('pokemon_cache');
    const pokemonCache = cache ? JSON.parse(cache) : {};

    const candidates = this.catalog.allPokemon.filter(p => Number.isInteger(p.number));

    const missingPokemon = candidates.filter(pokemon =>
      !pokemonCache[pokemon.number.toString()]
    );

    if (missingPokemon.length === 0) {
      console.log('All Pokémon are cached');
      this.isCacheLoading.next(false);
      this.cacheLoadingProgress.next(100);
      return;
    }

    console.log(`${missingPokemon.length} Pokémon left to load`);
    this.isCacheLoading.next(true);
    this.cacheLoadingProgress.next(0);

    let completedRequests = 0;
    const totalMissing = missingPokemon.length;
    const batchSize = 50;

    const processBatch = (startIndex: number) => {
      if (startIndex >= totalMissing) {
        console.log('Pokémon cache build completed');
        this.isCacheLoading.next(false);
        this.cacheLoadingProgress.next(100);
        return;
      }

      const batch = missingPokemon.slice(startIndex, startIndex + batchSize);
      console.log(`Processing batch ${Math.floor(startIndex / batchSize) + 1} of ${Math.ceil(totalMissing / batchSize)}`);

      const batchRequests = batch.map(pokemon =>
        this.pokeApiService.getPokemonById(pokemon.number).pipe(
          map(response => {
            completedRequests++;
            const progress = Math.round((completedRequests / totalMissing) * 100);
            this.cacheLoadingProgress.next(progress);

            if (completedRequests % 3 === 0) {
              console.log(`Cache progress: ${completedRequests}/${totalMissing} missing Pokémon loaded (${progress}%)`);
            }
            return response;
          })
        )
      );

      forkJoin(batchRequests).subscribe({
        next: () => {
          setTimeout(() => {
            processBatch(startIndex + batchSize);
          }, 2000);
        },
        error: (error) => {
          console.error('Error building cache:', error);
          setTimeout(() => {
            processBatch(startIndex + batchSize);
          }, 3000);
        }
      });
    };

    processBatch(0);
  }
}
