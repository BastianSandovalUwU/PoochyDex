import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { PoochyDexApiService } from 'app/modules/poochyDexApi/services/poochyDexApi.service';
import { Pokemon, PokemonForm } from '../../../../../entities/poochydex-api/pokemon.type';
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

  constructor(private poochyDexApiService: PoochyDexApiService) {
    this.poochyDexApiService.getAllPokemon().subscribe((response) => {
      this.allPokemon = response.data;
    });
    this.poochyDexApiService.getAllPokemonForms().subscribe((response) => {
      this.allPokemonForms = response.data;
    });
  }

  getPokemonSpriteImg(pokemonName: string, option: 'home' | 'icon' | 'homeShiny' | 'globalLinkArt'): Observable<string> {
    const name = getCorrectPokemonName(pokemonName);
    const placeholder = 'https://i.imgur.com/uKx7iOF.png';

    return this.poochyDexApiService.getPokemonByName(name).pipe(
      map((response) => {
        const pokemon = response.data;
        if (!pokemon || !pokemon.sprites) {
          return placeholder;
        }

        switch (option) {
          case 'icon':
            return pokemon.sprites.iconUrl || placeholder;
          case 'home':
            return pokemon.sprites.homeUrl || placeholder;
          case 'homeShiny':
            return pokemon.sprites.homeShinyUrl || placeholder;
          case 'globalLinkArt':
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
   */
  getPokemonArtwork(pokemonName: string): { sugimoriArt?: string; globalLinkArt?: string } {
    const name = getCorrectPokemonName(pokemonName);
    let combined: (Pokemon | PokemonForm)[] = [...this.allPokemon, ...this.allPokemonForms];

    const pokemon = combined.find(f => f.name === name);

    if (!pokemon || !pokemon.sprites) {
      return {};
    }

    const { sugimoriArt, globalLinkArt } = pokemon.sprites;

    return {
      ...(sugimoriArt ? { sugimoriArt } : {}),
      ...(globalLinkArt ? { globalLinkArt } : {})
    };
  }
}
