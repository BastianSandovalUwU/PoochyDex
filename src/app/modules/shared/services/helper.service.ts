import { Injectable } from '@angular/core';
import { PokeApiService } from './pokeApi.service';
import { Observable, forkJoin, map } from 'rxjs';
import { Ability, Type } from '../../../../../entities/pokemon.entity';
import { AbilityName, AbilityResponse, Name } from '../../../../../entities/pokemon-ability.entity';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

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
      case 'red': return 'bg-red';
      case 'blue': return 'bg-blue';
      case 'yellow': return 'bg-yellow text-black';
      case 'gold': return 'bg-gold';
      case 'silver': return 'bg-silver';
      case 'crystal': return 'bg-crystal';
      case 'ruby': return 'bg-ruby';
      case 'sapphire': return 'bg-sapphire';
      case 'emerald': return 'bg-emerald';
      case 'firered': return 'bg-fire-red';
      case 'leafgreen': return 'bg-leaf-green';
      case 'diamond': return 'bg-diamond text-black';
      case 'pearl': return 'bg-pearl text-black';
      case 'platinum': return 'bg-platinum text-black';
      case 'heartgold': return 'bg-heartgold';
      case 'soulsilver': return 'bg-soulsilver';
      case 'black': return 'bg-black';
      case 'white': return 'bg-white text-black';
      case 'black-2': return 'bg-black-2';
      case 'white-2': return 'bg-white-2 text-black';
      case 'x': return 'bg-x';
      case 'y': return 'bg-y';
      case 'omega-ruby': return 'bg-omega-ruby';
      case 'alpha-sapphire': return 'bg-alpha-sapphire';
      case 'sun': return 'bg-sun';
      case 'moon': return 'bg-moon';
      case 'ultra-sun': return 'bg-ultra-sun';
      case 'ultra-moon': return 'bg-ultra-moon';
      case 'lets-go-pikachu': return 'bg-letsGo-pikachu text-black';
      case 'lets-go-eevee': return 'bg-letsGo-eevee text-black';
      case 'sword': return 'bg-sword';
      case 'shield': return 'bg-shield';
      case 'scarlet': return 'bg-scarlet';
      case 'violet': return 'bg-violet';
      case 'red-blue': return 'bg-red';
      case 'gold-silver': return 'bg-gold';
      case 'ruby-sapphire': return 'bg-ruby';
      case 'fire-red-leaf-green': return 'bg-fire-red';
      case 'diamond-pearl': return 'bg-diamond';
      case 'heartgold-soulsilver': return 'bg-heartgold';
      case 'black-white': return 'bg-black';
      case 'black-2-white-2': return 'bg-black-2';
      case 'x-y': return 'bg-x';
      case 'omega-ruby-alpha-sapphire': return 'bg-omega-ruby';
      case 'sun-moon': return 'bg-sun';
      case 'ultra-sun-ultra-moon': return 'bg-ultra-sun';
      case 'lets-go-pikachu-lets-go-eevee': return 'bg-letsGo-pikachu text-black';
      case 'sword-shield': return 'bg-sword';
      case 'scarlet-violet': return 'bg-scarlet';
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
        case 'silver': return 'PLata';
        case 'crystal': return 'Cristal';
        case 'colosseum': return 'Colosseum';
        case 'ruby': return 'Rubí';
        case 'sapphire': return 'Zafiro';
        case 'emerald': return 'Esmeralda';
        case 'firered': return 'Rojo Fuego';
        case 'leafgreen': return 'Verde Hoja';
        case 'diamond': return 'Diamante';
        case 'pearl': return 'Perla';
        case 'platinum': return 'PLatino';
        case 'heartgold': return 'Oro HeartGold';
        case 'soulsilver': return 'Plta SoulSilver';
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
        case 'black-white': return 'Negro - Blanco';
        case 'black-2-white-2': return 'Negro 2 - Blanco 2';
        case 'x-y': return 'Pokémon X - Pokémon Y';
        case 'omega-ruby-alpha-sapphire': return 'Rubí Omega - Zafiro Alfa';
        case 'sun-moon': return 'Sol - Luna';
        case 'ultra-sun-ultra-moon': return 'Ultrasol - Ultraluna';
        case 'lets-go-pikachu-lets-go-eevee': return "Let's Go, Pikachu! - Let's Go, Eevee!";
        case 'sword-shield': return 'Espada - Escudo';
        case 'scarlet-violet': return 'Escarlata - Purpura';
        default: return '';
      }
    } else {
      return gameName;
    }
  }

}
