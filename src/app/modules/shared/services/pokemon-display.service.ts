import { Injectable } from '@angular/core';
import { TargetTypes } from '../../../../../entities/common/const.interface';
import {
  getGameName,
  getGameIconGame,
  getGameIconNameForLanguage,
  getTypeColorClass,
  getGameVersionColor,
  getGenerationName,
  getTypeNameByLanguage,
  getTargetTypeName,
  getTranslateTypeName,
  getEggGroupName,
  getPokedexNumber,
  getCorrectPokemonName
} from '../../../../../entities/common/enum';

/**
 * UI helpers: game/type labels, colors, icons, and pure formatting (no HTTP).
 */
@Injectable({
  providedIn: 'root'
})
export class PokemonDisplayService {

  getTypeNameByLanguage(typeName: string, language: string): string {
    return getTypeNameByLanguage(typeName, language);
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
    switch (color) {
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

  getGameIconNameForLanguage(typeName: string, language: string): string {
    return getGameIconNameForLanguage(typeName, language);
  }

  navigateToGame(gameName: string): string {
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

    return gameMap[gameName] ?? '';
  }

  getGameIconForGeneration(gen: number): string[] {
    switch (gen) {
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
    switch (form) {
      case 'alola': return ['https://i.imgur.com/uBItHSf.png', 'https://i.imgur.com/uBItHSf.png'];
      case 'galar': return ['https://i.imgur.com/lqJ4HD7.png', 'https://i.imgur.com/lqJ4HD7.png'];
      case 'paldea': return ['https://i.imgur.com/08V6nOU.png', 'https://i.imgur.com/08V6nOU.png'];
      case 'hisui': return ['https://i.imgur.com/8OwCV9k.png', 'https://i.imgur.com/8OwCV9k.png'];
      case 'gmax': return ['https://imgur.com/gXd5yaL.png', 'https://imgur.com/gXd5yaL.png'];
      case 'mega': return ['https://i.imgur.com/YLkgY3T.png', 'https://i.imgur.com/Ygj2JeC.png'];
      default: return [];
    }
  }

  getCorrectPokemonName(pokemonName: string): string {
    return getCorrectPokemonName(pokemonName);
  }

  getPokedexNumber(pokedexName: string): number {
    return getPokedexNumber(pokedexName);
  }

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  addZerosToNumber(number: number): string {
    return number.toString().padStart(4, '0');
  }
}
