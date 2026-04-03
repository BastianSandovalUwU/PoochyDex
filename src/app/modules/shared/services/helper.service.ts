import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PokeApiService } from './pokeApi.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { Ability } from '../../../../../entities/pokemon.entity';
import { AbilityName, AbilityResponse, Name } from '../../../../../entities/pokemon-ability.entity';
import { DetailMove } from '../../../../../entities/moves.entity';
import { TargetTypes } from '../../../../../entities/common/const.interface';
import { PoochyDexApiService } from 'app/modules/poochyDexApi/services/poochyDexApi.service';
import { Pokemon, PokemonForm } from '../../../../../entities/poochydex-api/pokemon.type';
import { getGameName, getGameIconGame, getGameIconNameForLanguage, getTypeColorClass, getGameVersionColor, getGenerationName, getTypeNameByLanguage, getTargetTypeName, getTranslateTypeName, getEggGroupName, getPokedexNumber, getCorrectPokemonName } from '../../../../../entities/common/enum';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private cacheLoadingProgress = new BehaviorSubject<number>(0);
  private isCacheLoading = new BehaviorSubject<boolean>(false);

  cacheLoadingProgress$ = this.cacheLoadingProgress.asObservable();
  isCacheLoading$ = this.isCacheLoading.asObservable();

  allPokemon: Pokemon[] = [];
  allPokemonForms: PokemonForm[] = [];

  constructor(private pokeApiService: PokeApiService,
              private poochyDexApiService: PoochyDexApiService
  ) {
    this.poochyDexApiService.getAllPokemon().subscribe((response) => {
      this.allPokemon = response.data;
    });
    this.poochyDexApiService.getAllPokemonForms().subscribe((response) => {
      this.allPokemonForms = response.data;
    });
  }

  getAbilityNames(abilities: Ability[]): Observable<{ ability: Ability, names: AbilityName[] }[]> {
    const observables = abilities.map(ability =>
      this.pokeApiService.getAbilityById(ability.ability.name)
    );

    return forkJoin(observables).pipe(
      map((results: AbilityResponse[], index: number) => {
        return results.map((result, i) => {
          const names = result.names.map((nameInfo: Name) => ({
            language: nameInfo.language.name,
            abilityName: nameInfo.name
          }));
          return { ability: abilities[i], names };
        });
      })
    );
  }

  getTypeNameByLanguage(typeName: string, language: string): string {
    return getTypeNameByLanguage(typeName, language);
  }

  getMoveNameByLanguage(move: DetailMove, language: string): Observable<{ language: string, moveName: string }> {
    return of(move).pipe(
      map(moveDetail => {
        const nameInfo = moveDetail.names.find(name => name.language.name === language);
        return {
          language: language,
          moveName: nameInfo ? nameInfo.name : 'Not Available'
        };
      })
    );
  }

  getMoveEffectEntryByLanguage(move: DetailMove, language: string): Observable<{ language: string, moveName: string, effect: string, shortEffect: string }> {
    return of(move).pipe(
      map(moveDetail => {
        const nameInfo = moveDetail.names.find(name => name.language.name === language);
        let effectInfo = moveDetail.effect_entries.find(effect => effect.language.name === language);

        // If not found in the desired language, try to get the English version
        if (!effectInfo) {
          effectInfo = moveDetail.effect_entries.find(effect => effect.language.name === 'en');
        }

        return {
          language: language,
          moveName: nameInfo ? nameInfo.name : 'Not Available',
          effect: effectInfo ? effectInfo.effect : 'Effect not available',
          shortEffect: effectInfo ? effectInfo.short_effect : 'Short effect not available'
        };
      })
    );
  }

  createAllPokemonCache() {
    console.log('Checking Pokémon cache...');

    // Ensure custom API Pokémon list is loaded first
    if (!this.allPokemon || this.allPokemon.length === 0) {
      console.log('allPokemon not loaded from Node API yet; loading before building cache...');
      this.poochyDexApiService.getAllPokemon().subscribe({
        next: (response) => {
          this.allPokemon = response.data || [];
          console.log(`allPokemon loaded (${this.allPokemon.length} rows), retrying cache build...`);
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

    // Only Pokémon with a valid integer National Dex number are cached from PokéAPI
    const candidates = this.allPokemon.filter(p => Number.isInteger(p.number));

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
          // Wait 2s before the next batch
          setTimeout(() => {
            processBatch(startIndex + batchSize);
          }, 2000);
        },
        error: (error) => {
          console.error('Error building cache:', error);
          // On error, wait 3s before retrying the next batch
          setTimeout(() => {
            processBatch(startIndex + batchSize);
          }, 3000);
        }
      });
    };

    // Start first batch
    processBatch(0);
  }

  navigateToGame(gameName: string) {
    const gameMap: { [key: string]: string } = {
      'red': 'red-blue',
      'blue': 'red-blue',
      'yellow': 'yellow',
      'gold': 'gold-silver',
      'silver': 'gold-silver',
      'crystal': 'crystal',
      'ruby': 'ruby-sapphire',
      'sapphire': 'ruby-sapphire',
      'emerald': 'emerald',
      'firered': 'firered-leafgreen',
      'leafgreen': 'firered-leafgreen',
      'diamond': 'diamond-pearl',
      'pearl': 'diamond-pearl',
      'platinum': 'platinum',
      /* Optional slug pairs for navigateToGame — enable when linking those game keys from UI */
      // 'heartgold': 'heartgold-soulsilver',
      // 'soulsilver': 'heartgold-soulsilver',
      // 'black': 'black-white',
      // 'white': 'black-white',
      // 'black-2': 'black-2-white-2',
      // 'white-2': 'black-2-white-2',
      // 'x': 'x-y',
      // 'y': 'x-y',
      // 'omega-ruby': 'omega-ruby-alpha-sapphire',
      // 'alpha-sapphire': 'omega-ruby-alpha-sapphire',
      // 'sun': 'sun-moon',
      // 'moon': 'sun-moon',
      // 'ultra-sun': 'ultra-sun-ultra-moon',
      // 'ultra-moon': 'ultra-sun-ultra-moon',
      // 'lets-go-pikachu': 'lets-go-pikachu-lets-go-eevee',
      // 'lets-go-eevee': 'lets-go-pikachu-lets-go-eevee',
      // 'sword': 'sword-shield',
      // 'shield': 'sword-shield',
      // 'scarlet': 'scarlet-violet',
      // 'violet': 'scarlet-violet',
    };

    const name = gameMap[gameName];

    if (name) {
      return name;
    } else {
      return '';
    }
  }

  getTypeColorClass(typeName: string, language: string): string {
    return getTypeColorClass(typeName, language);
  }

  getGenerationName(generationName: string, language: string): string {
    return getGenerationName(generationName, language);
  }

  getTargetTypeName(targetType: TargetTypes, language: string): string {
    return getTargetTypeName(targetType, language);
  }

  getTranslateTypeName(typeName: string, language: string): string {
    return getTranslateTypeName(typeName, language);
  }
  getEggGroupName(groupName: string, language: string): string {
    return getEggGroupName(groupName, language);
  }

  getGameVersionColor(gameVersion: string): string {
    return getGameVersionColor(gameVersion);
  }

  getPokemonColor(color: string): string {
    switch(color) {
      case 'red': return 'bg-pokemon-color-red';
      case 'blue': return 'bg-pokemon-color-blue';
      case 'yellow': return 'bg-pokemon-color-yellow';
      case 'purple': return 'bg-pokemon-color-purple';
      case 'pink': return 'bg-pokemon-color-pink';
      case 'green': return 'bg-pokemon-color-green';
      case 'gray': return 'bg-pokemon-color-gray';
      case 'brown': return 'bg-pokemon-color-brown';
      case 'black': return 'bg-pokemon-color-black';
      case 'white': return 'bg-pokemon-color-white';
      default: return '';
    }
  }

  getGameName(gameName: string, language: string): string {
    return getGameName(gameName, language);
  }

  getGameIconGame(gameName: string): string[] {
    return getGameIconGame(gameName);
  }

  getPokemonSpriteImg(pokemonName: string, option: "home" | "icon" | "homeShiny" | "globalLinkArt"): Observable<string> {
    const name = this.getCorrectPokemonName(pokemonName);
    const placeholder = "https://i.imgur.com/uKx7iOF.png"; // MissingNo placeholder

    return this.poochyDexApiService.getPokemonByName(name).pipe(
      map((response) => {
        const pokemon = response.data;
        if (!pokemon || !pokemon.sprites) {
          return placeholder;
        }

        switch (option) {
          case "icon":
            return pokemon.sprites.iconUrl || placeholder;
          case "home":
            return pokemon.sprites.homeUrl || placeholder;
          case "homeShiny":
            return pokemon.sprites.homeShinyUrl || placeholder;
          case "globalLinkArt":
            return pokemon.sprites.globalLinkArt || placeholder;
          default:
            return placeholder;
        }
      }),
      catchError(() => of(placeholder))
    );
  }

  /**
   * Devuelve las ilustraciones alternativas del Pokémon (si existen)
   * como Sugimori Art o Global Link Art.
   */
  getPokemonArtwork(pokemonName: string): { sugimoriArt?: string; globalLinkArt?: string } {
    const name = this.getCorrectPokemonName(pokemonName);
    let allPokemon: (Pokemon | PokemonForm)[] = this.allPokemon;
    allPokemon = allPokemon.concat(this.allPokemonForms);

    const pokemon = allPokemon.find(f => f.name === name);

    if (!pokemon || !pokemon.sprites) {
      return {};
    }

    const { sugimoriArt, globalLinkArt } = pokemon.sprites;

    return {
      ...(sugimoriArt ? { sugimoriArt } : {}),
      ...(globalLinkArt ? { globalLinkArt } : {})
    };
  }

  getCorrectPokemonName(pokemonName: string): string {
    return getCorrectPokemonName(pokemonName);
  }

  getPokedexNumber(pokedexName: string): number {
    return getPokedexNumber(pokedexName);
  }

  getGameIconForGeneration(gen: number): string[] {
    switch(gen) {
      case 1: return ['red', 'blue'];
      case 2: return ['gold', 'silver'];
      case 3: return ['ruby', 'sapphire'];
      case 4: return ['diamond', 'pearl'];
      case 5: return ['black', 'white'];
      case 6: return ['x', 'y'];
      case 7: return ['sun', 'moon'];
      case 8: return ['sword', 'shield'];
      case 9: return ['scarlet', 'violet'];
      default: return [];
    }
  }

  getGameIconForForm(form: string): string[] {
    switch(form) {
      case 'alola': return ['https://i.imgur.com/uBItHSf.png', 'https://i.imgur.com/uBItHSf.png'];
      case 'galar': return ['https://i.imgur.com/lqJ4HD7.png', 'https://i.imgur.com/lqJ4HD7.png'];
      case 'paldea': return ['https://i.imgur.com/08V6nOU.png', 'https://i.imgur.com/08V6nOU.png'];
      case 'hisui': return ['https://i.imgur.com/8OwCV9k.png', 'https://i.imgur.com/8OwCV9k.png'];
      case 'gmax': return ['https://imgur.com/gXd5yaL.png', 'https://imgur.com/gXd5yaL.png'];
      case 'mega': return ['https://i.imgur.com/YLkgY3T.png', 'https://i.imgur.com/Ygj2JeC.png'];
      default: return [];
    }
  }

  getGameIconNameForLanguage(typeName: string, language: string): string {
    return getGameIconNameForLanguage(typeName, language);
  }

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  addZerosToNumber(number: number): string {
    return number.toString().padStart(4, '0');
  }
}
