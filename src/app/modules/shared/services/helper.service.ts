import { Injectable } from '@angular/core';
import { PokeApiService } from './pokeApi.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { Ability, Type } from '../../../../../entities/pokemon.entity';
import { AbilityName, AbilityResponse, Name } from '../../../../../entities/pokemon-ability.entity';
import { DetailMove, EffectEntry } from '../../../../../entities/moves.entity';
import { TargetTypes, AllPokemon, ALL_POKEMON, AllPokemonGmaxForms, ALL_GMAX_POKEMON_FORMS, ALL_POKEMON_MEGA_FORMS, AllPokemonMegaForms, MISC_POKEMON_FORMS } from '../../../../../entities/common/const.interface';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  allPokemon: AllPokemon[] = ALL_POKEMON;
  allPokemonGmax: AllPokemonGmaxForms[] = ALL_GMAX_POKEMON_FORMS;
  allPokemonMega: AllPokemonMegaForms[] = ALL_POKEMON_MEGA_FORMS;
  allPokemonMisc: any[] = MISC_POKEMON_FORMS;

  constructor(private pokeApiService: PokeApiService) { }

  getPokemonTypes(types: Type[]): Observable<{ language: string, typeName: string }[][]> {
    const observables = types.map(type => this.pokeApiService.getPokemonTypeByName(type.type.name));

    return forkJoin(observables).pipe(
      map((results: any[]) => {
        return results.map(type => {
          return type.names.map(nameInfo => ({
            language: nameInfo.language.name,
            typeName: nameInfo.name
          }));
        });
      })
    );
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

  getMoveType(typeName: string): Observable<{ language: string, typeName: string }[]> {
    return this.pokeApiService.getPokemonTypeByName(typeName).pipe(
      map((type: any) => {
        return type.names.map(nameInfo => ({
          language: nameInfo.language.name,
          typeName: nameInfo.name
        }));
      }),
      catchError(error => {
        console.error(`Error al obtener el tipo del movimiento ${typeName}:`, error);
        // Return an empty array or a default value in case of error
        return of([]);
      })
    );
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

  getTypeColorClass(typeName: string, language: string): string {
    if (language === 'en') {
      switch (typeName.toLowerCase()) {
        case 'grass': return 'bg-grass';
        case 'fire': return 'bg-fire';
        case 'water': return 'bg-water';
        case 'bug': return 'bg-bug';
        case 'normal': return 'bg-normal text-black';
        case 'poison': return 'bg-poison';
        case 'electric': return 'bg-electric';
        case 'ground': return 'bg-ground';
        case 'fairy': return 'bg-fairy';
        case 'fighting': return 'bg-fighting';
        case 'psychic': return 'bg-psychic';
        case 'rock': return 'bg-rock';
        case 'ghost': return 'bg-ghost';
        case 'ice': return 'bg-ice';
        case 'dragon': return 'bg-dragon';
        case 'dark': return 'bg-dark';
        case 'steel': return 'bg-steel';
        case 'flying': return 'bg-flying';
        default: return 'bg-default';
      }
    } else if (language === 'es') {
      switch (typeName.toLowerCase()) {
        case 'planta': return 'bg-grass';
        case 'fuego': return 'bg-fire';
        case 'agua': return 'bg-water';
        case 'bicho': return 'bg-bug';
        case 'normal': return 'bg-normal text-black';
        case 'veneno': return 'bg-poison';
        case 'eléctrico': return 'bg-electric';
        case 'tierra': return 'bg-ground';
        case 'hada': return 'bg-fairy';
        case 'lucha': return 'bg-fighting';
        case 'psíquico': return 'bg-psychic';
        case 'roca': return 'bg-rock';
        case 'fantasma': return 'bg-ghost';
        case 'hielo': return 'bg-ice';
        case 'dragón': return 'bg-dragon';
        case 'siniestro': return 'bg-dark';
        case 'acero': return 'bg-steel';
        case 'volador': return 'bg-flying';
        default: return 'bg-default';
      }
    } else {
      return 'bg-default';
    }
  }
  getGenerationName(generationName: string, language: string): string {
    if (language === 'es') {
      switch (generationName.toLowerCase()) {
        case 'generation-i': return 'Primera Generación';
        case 'generation-ii': return 'Segunda Generación';
        case 'generation-iii': return 'Tercera Generación';
        case 'generation-iv': return 'Cuarta Generación';
        case 'generation-v': return 'Quinta Generación';
        case 'generation-vi': return 'Sexta Generación';
        case 'generation-vii': return 'Septima Generación';
        case 'generation-vii': return 'Octava Generación';
        case 'generation-ix': return 'Novena Generación';
        case 'generation-x': return 'Decima Generación';
        default: return '';
      }
    } else if (language === 'en'){
      switch (generationName.toLowerCase()) {
        case 'generation-i': return 'First Generación';
        case 'generation-ii': return 'Second Generación';
        case 'generation-iii': return 'Third Generación';
        case 'generation-iv': return 'Fourth Generación';
        case 'generation-v': return 'Fifth Generación';
        case 'generation-vi': return 'Sixth Generación';
        case 'generation-vii': return 'Seventh Generación';
        case 'generation-vii': return 'Eighth Generación';
        case 'generation-ix': return 'Ninth Generación';
        case 'generation-x': return 'Tenth Generación';
        default: return '';
      }
    } else {
      return '';
    }
  }
  getTargetTypeName(targetType: TargetTypes, language: string): string {
    if (language === 'es') {
      switch (targetType) {
        case 'specific-move': return 'Usuario';
        case 'selected-pokemon-me-first': return 'Pokémon Seleccionado';
        case 'ally': return 'Aliado Adyacente';
        case 'users-field': return 'Campo del Usuario';
        case 'user-or-ally': return 'Usuario o Aliado';
        case 'opponents-field': return 'Campo Rival';
        case 'user': return 'Usuario';
        case 'random-opponent': return 'Aleatorio';
        case 'all-other-pokemon': return 'Pokémon Adyacentes';
        case 'selected-pokemon': return 'Pokémon Seleccionado';
        case 'all-opponents': return 'Todos';
        case 'entire-field': return 'Campo Entero';
        case 'user-and-allies': return 'Usuario y Aliados';
        case 'all-pokemon': return 'Todos los Pokémon';
        case 'all-allies': return 'Todos los Aliados';
        case 'fainting-pokemon': return 'Pokémon Debilitado';
        default: return '';
      }
    } else if (language === 'en'){
        return targetType.replace(/-/g, ' ');
    } else {
      return targetType;
    }
  }
  getTranslateTypeName(typeName: string, language: string): string {
    if(language === 'es') {
      switch (typeName.toLowerCase()) {
        case 'grass': return 'Planta';
        case 'fire': return 'Fuego';
        case 'water': return 'Agua';
        case 'bug': return 'Bicho';
        case 'normal': return 'Normal';
        case 'poison': return 'Veneno';
        case 'electric': return 'Electrico';
        case 'ground': return 'Tierra';
        case 'fairy': return 'Hada';
        case 'fighting': return 'Lucha';
        case 'psychic': return 'Psiquico';
        case 'rock': return 'Roca';
        case 'ghost': return 'Fantasma';
        case 'ice': return 'Hielo';
        case 'dragon': return 'Dragón';
        case 'dark': return 'Siniestro';
        case 'steel': return 'Acero';
        case 'flying': return 'Volador';
        default: return 'bg-default';
      }
    } else {
      return typeName;
    }
  }
  getEggGroupName(groupName: string, language: string): string {
    if(language === 'es'){
      switch (groupName.toLowerCase()) {
        case 'no-eggs': return 'Desconocido';
        case 'dragon': return 'Dragón';
        case 'ditto': return 'Ditto';
        case 'water2': return 'Agua 2';
        case 'indeterminate': return 'Amorfo';
        case 'mineral': return 'Mineral';
        case 'water3': return 'Agua 3';
        case 'humanshape': return 'Humanoide';
        case 'plant': return 'Planta';
        case 'fairy': return 'Hada';
        case 'ground': return 'Campo';
        case 'flying': return 'Volador';
        case 'bug': return 'Bicho';
        case 'water1': return 'Agua 1';
        case 'monster': return 'Monstruo';
        default: return '';
      }
    } else {
      return groupName;
    }
  }

  getGameVersionColor(gameVersion: string): string {
    switch(gameVersion) {
      case 'red': return 'bg-pokemon-red';
      case 'blue': return 'bg-pokemon-blue';
      case 'yellow': return 'bg-pokemon-yellow text-black';
      case 'gold': return 'bg-pokemon-gold';
      case 'silver': return 'bg-pokemon-silver';
      case 'crystal': return 'bg-pokemon-crystal';
      case 'ruby': return 'bg-pokemon-ruby';
      case 'sapphire': return 'bg-pokemon-sapphire';
      case 'emerald': return 'bg-pokemon-emerald';
      case 'firered': return 'bg-pokemon-fire-red';
      case 'leafgreen': return 'bg-pokemon-leaf-green';
      case 'diamond': return 'bg-pokemon-diamond text-black';
      case 'pearl': return 'bg-pokemon-pearl text-black';
      case 'platinum': return 'bg-pokemon-platinum text-black';
      case 'heartgold': return 'bg-pokemon-heartgold';
      case 'soulsilver': return 'bg-pokemon-soulsilver';
      case 'black': return 'bg-pokemon-black';
      case 'white': return 'bg-pokemon-white text-black';
      case 'black-2': return 'bg-pokemon-black-2';
      case 'white-2': return 'bg-pokemon-white-2 text-black';
      case 'x': return 'bg-pokemon-x';
      case 'y': return 'bg-pokemon-y';
      case 'omega-ruby': return 'bg-pokemon-omega-ruby';
      case 'alpha-sapphire': return 'bg-pokemon-alpha-sapphire';
      case 'sun': return 'bg-pokemon-sun';
      case 'moon': return 'bg-pokemon-moon';
      case 'ultra-sun': return 'bg-pokemon-ultra-sun';
      case 'ultra-moon': return 'bg-pokemon-ultra-moon';
      case 'lets-go-pikachu': return 'bg-pokemon-letsGo-pikachu text-black';
      case 'lets-go-eevee': return 'bg-pokemon-letsGo-eevee text-black';
      case 'sword': return 'bg-pokemon-sword';
      case 'shield': return 'bg-pokemon-shield';
      case 'brilliant-diamond': return 'bg-brilliant-diamond';
      case 'shining-pearl': return 'bg-shining-pearl';
      case 'scarlet': return 'bg-pokemon-scarlet';
      case 'violet': return 'bg-pokemon-violet';
      case 'red-blue': return 'bg-pokemon-red';
      case 'gold-silver': return 'bg-pokemon-gold text-black';
      case 'ruby-sapphire': return 'bg-pokemon-ruby';
      case 'fire-red-leaf-green': return 'bg-pokemon-fire-red';
      case 'diamond-pearl': return 'bg-pokemon-diamond text-black';
      case 'heartgold-soulsilver': return 'bg-pokemon-heartgold text-black';
      case 'black-white': return 'bg-pokemon-black';
      case 'black-2-white-2': return 'bg-pokemon-black-2';
      case 'x-y': return 'bg-pokemon-x';
      case 'omega-ruby-alpha-sapphire': return 'bg-pokemon-omega-ruby';
      case 'sun-moon': return 'bg-pokemon-sun';
      case 'ultra-sun-ultra-moon': return 'bg-pokemon-ultra-sun';
      case 'lets-go-pikachu-lets-go-eevee': return 'bg-pokemon-letsGo-pikachu text-black';
      case 'sword-shield': return 'bg-pokemon-sword';
      case 'brilliant-diamond-and-shining-pearl': return 'bg-pokemon-brilliant-diamond text-black';
      case 'scarlet-violet': return 'bg-pokemon-scarlet';
      case 'legends-arceus': return 'bg-white text-black';
      default: return '';
    }
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
    if(language === 'es'){
      switch (gameName.toLowerCase()) {
        case 'red': return 'Rojo';
        case 'blue': return 'Azul';
        case 'yellow': return 'Amarillo';
        case 'gold': return 'Oro';
        case 'silver': return 'Plata';
        case 'crystal': return 'Cristal';
        case 'colosseum': return 'Colosseum';
        case 'ruby': return 'Rubí';
        case 'sapphire': return 'Zafiro';
        case 'emerald': return 'Esmeralda';
        case 'firered': return 'Rojo Fuego';
        case 'leafgreen': return 'Verde Hoja';
        case 'diamond': return 'Diamante';
        case 'pearl': return 'Perla';
        case 'platinum': return 'Platino';
        case 'heartgold': return 'Oro HeartGold';
        case 'soulsilver': return 'Plata SoulSilver';
        case 'black': return 'Negro';
        case 'white': return 'Blanco';
        case 'black-2': return 'Negro 2';
        case 'white-2': return 'Blanco 2';
        case 'x': return 'Pokémon X';
        case 'y': return 'Pokémon Y';
        case 'omega-ruby': return 'Rubí Omega';
        case 'alpha-sapphire': return 'Zafiro Alfa';
        case 'sun': return 'Sol';
        case 'moon': return 'Luna';
        case 'ultra-sun': return 'Ultrasol';
        case 'ultra-moon': return 'Ultraluna';
        case 'lets-go-pikachu': return "Let's Go, Pikachu!";
        case 'lets-go-eevee': return "Let's Go, Eevee!";
        case 'sword': return 'Espada';
        case 'shield': return 'Escudo';
        case 'scarlet': return 'Escarlata';
        case 'violet': return 'Purpura';
        case 'red-blue': return 'Rojo - Azul';
        case 'gold-silver': return 'Oro - Plata';
        case 'ruby-sapphire': return 'Rubí - Zafiro';
        case 'firered-leafgreen': return 'Rojo Fuego - Verde Hoja';
        case 'diamond-pearl': return 'Diamante - Perla';
        case 'heartgold-soulsilver': return 'Oro HeartGold - Plata SoulSilver';
        case 'black-white': return 'Negro - Blanco';
        case 'black-2-white-2': return 'Negro 2 - Blanco 2';
        case 'x-y': return 'Pokémon X - Pokémon Y';
        case 'omega-ruby-alpha-sapphire': return 'Rubí Omega - Zafiro Alfa';
        case 'sun-moon': return 'Sol - Luna';
        case 'ultra-sun-ultra-moon': return 'Ultrasol - Ultraluna';
        case 'lets-go-pikachu-lets-go-eevee': return "Let's Go, Pikachu! - Let's Go, Eevee!";
        case 'sword-shield': return 'Espada - Escudo';
        case 'scarlet-violet': return 'Escarlata - Purpura';
        case 'brilliant-diamond-and-shining-pearl': return 'Diamante Brillante - Perla Reluciente';
        case 'legends-arceus': return 'Legendas Arceus';
        default: return '';
      }
    } else {
      return gameName;
    }
  }

  getPokemonSpriteImg(pokemonName: string): string {

    let name = '';
    switch (pokemonName) {
      case 'deoxys':
          name = 'deoxys-normal'
        break;
      case 'wormadam':
          name = 'wormadam-plant'
        break;
      case 'giratina':
          name = 'giratina-altered'
        break;
      case 'shaymin':
          name = 'shaymin-land'
        break;
      case 'basculin':
          name = 'basculin-red-striped'
        break;
      case 'basculegion':
          name = 'basculegion-male'
        break;
      case 'darmanitan':
          name = 'darmanitan-standard'
        break;
      case 'keldeo':
          name = 'keldeo-ordinary'
        break;
      case 'meloetta':
          name = 'meloetta-aria'
        break;
      case 'tornadus':
          name = 'tornadus-incarnate'
        break;
      case 'thundurus':
          name = 'thundurus-incarnate'
        break;
      case 'landorus':
          name = 'landorus-incarnate'
        break;
      case 'enamorus':
          name = 'enamorus-incarnate'
        break;
      case 'aegislash':
          name = 'aegislash-shield'
        break;
      case 'meowstic':
          name = 'meowstic-male'
        break;
      case 'pumpkaboo':
          name = 'pumpkaboo-average'
        break;
      case 'gourgeist':
          name = 'gourgeist-average'
        break;
      case 'zygarde':
          name = 'zygarde-50'
        break;
      default:
        name = pokemonName;
        break;
    }
    let allPokemon = this.allPokemon;
    allPokemon = allPokemon.concat(this.allPokemonGmax, this.allPokemonMega, this.allPokemonMisc);
    const pokemon = allPokemon.filter(f => f.name === name)[0];
    if(pokemon === undefined) {
      return null;
    }
    return pokemon.imageName;
  }
}
