import { Injectable } from '@angular/core';
import { combineLatest, Observable, catchError, map, of, shareReplay } from 'rxjs';
import { PoochyDexApiService } from 'app/modules/poochyDexApi/services/poochy-dex-api.service';
import { Pokemon, PokemonForm, PokemonResponse } from '../../../../../entities/poochydex-api/pokemon.type';
import { PokemonSpriteOption } from '../../../../../entities/poochydex-api/pokemon-sprite-option';
import { getCorrectPokemonName } from '../../../../../entities/common/enum';

/**
 * Data from the custom Node API: national list, forms, and sprite URLs for the UI.
 */
@Injectable({
  providedIn: 'root'
})
export class CustomPokemonCatalogService {

  allPokemon: Pokemon[] = [];
  allPokemonForms: PokemonForm[] = [];

  /** Caches in-flight/completed `getPokemonByName` requests so concurrent sprite lookups for the same Pokémon share one HTTP call. */
  private pokemonByNameCache = new Map<string, Observable<PokemonResponse>>();

  /**
   * Emits once both the Pokémon list and the forms list have loaded, so callers loading
   * straight into a detail page (deep link / page refresh) don't read `allPokemon` before
   * the catalog request resolves and silently get no alternate artwork.
   */
  private readonly catalogReady$: Observable<[Pokemon[], PokemonForm[]]>;

  constructor(private poochyDexApiService: PoochyDexApiService) {
    const allPokemon$ = this.poochyDexApiService.getAllPokemon().pipe(
      map((response) => {
        this.allPokemon = response.data;
        return this.allPokemon;
      }),
      shareReplay(1)
    );
    const allPokemonForms$ = this.poochyDexApiService.getAllPokemonForms().pipe(
      map((response) => {
        this.allPokemonForms = response.data;
        return this.allPokemonForms;
      }),
      shareReplay(1)
    );

    this.catalogReady$ = combineLatest([allPokemon$, allPokemonForms$]).pipe(shareReplay(1));
    this.catalogReady$.subscribe();
  }

  private getPokemonByNameCached(name: string): Observable<PokemonResponse> {
    let request = this.pokemonByNameCache.get(name);
    if (!request) {
      request = this.poochyDexApiService.getPokemonByName(name).pipe(shareReplay(1));
      this.pokemonByNameCache.set(name, request);
    }
    return request;
  }

  getPokemonSpriteImg(pokemonName: string, option: PokemonSpriteOption): Observable<string> {
    const name = getCorrectPokemonName(pokemonName);
    const placeholder = 'https://i.imgur.com/uKx7iOF.png';

    return this.getPokemonByNameCached(name).pipe(
      map((response) => {
        const pokemon = response.data;
        if (!pokemon || !pokemon.sprites) {
          return placeholder;
        }

        switch (option) {
          case PokemonSpriteOption.Icon:
            return pokemon.sprites.iconUrl || placeholder;
          case PokemonSpriteOption.Home:
            return pokemon.sprites.homeUrl || placeholder;
          case PokemonSpriteOption.HomeShiny:
            return pokemon.sprites.homeShinyUrl || placeholder;
          case PokemonSpriteOption.SugimoriArt:
            return pokemon.sprites.sugimoriArt || placeholder;
          case PokemonSpriteOption.GlobalLinkArt:
            return pokemon.sprites.globalLinkArt || placeholder;
          default:
            return placeholder;
        }
      }),
      catchError(() => of(placeholder))
    );
  }

  /**
   * Alternate artwork URLs from the custom API (Sugimori / Global Link), when present.
   * Synchronous: only reliable once `allPokemon`/`allPokemonForms` have already loaded.
   * Prefer `getPokemonArtwork$` when the catalog may still be in flight (e.g. deep link).
   */
  getPokemonArtwork(pokemonName: string): { homeShinyUrl?: string; sugimoriArt?: string; globalLinkArt?: string } {
    const name = getCorrectPokemonName(pokemonName);
    const combined: (Pokemon | PokemonForm)[] = [...this.allPokemon, ...this.allPokemonForms];

    const pokemon = combined.find(f => f.name === name);

    if (!pokemon || !pokemon.sprites) {
      return {};
    }

    const { homeShinyUrl, sugimoriArt, globalLinkArt } = pokemon.sprites;

    return {
      ...(homeShinyUrl ? { homeShinyUrl } : {}),
      ...(sugimoriArt ? { sugimoriArt } : {}),
      ...(globalLinkArt ? { globalLinkArt } : {})
    };
  }

  /** Same as `getPokemonArtwork`, but waits for the catalog lists to finish loading first. */
  getPokemonArtwork$(pokemonName: string): Observable<{ homeShinyUrl?: string; sugimoriArt?: string; globalLinkArt?: string }> {
    return this.catalogReady$.pipe(map(() => this.getPokemonArtwork(pokemonName)));
  }
}
