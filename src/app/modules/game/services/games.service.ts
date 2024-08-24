import { Injectable } from '@angular/core';
import { pokemonCrystalData, pokemonDiamondPearlData, pokemonEmeraldData, pokemonFireRedLeafGreenData, pokemonGoldSiverData, pokemonPlatinumData, pokemonRedBlueData, pokemonRubySapphireData, pokemonYellowData } from '../../../../../entities/common/game-data';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

constructor() { }


  getPokemonRedBlueData() {
    return pokemonRedBlueData;
  }
  getPokemonYellowData() {
    return pokemonYellowData;
  }
  getPokemonGoldSilverData() {
    return pokemonGoldSiverData;
  }
  getPokemonCrystalData() {
    return pokemonCrystalData;
  }
  getPokemonRubySapphireData() {
    return pokemonRubySapphireData;
  }
  getPokemonRubyEmeraldData() {
    return pokemonEmeraldData;
  }
  getPokemonFireRedLeafGreenData() {
    return pokemonFireRedLeafGreenData;
  }
  getPokemonDiamondPearlData() {
    return pokemonDiamondPearlData;
  }
  getPokemonPlatinumData() {
    return pokemonPlatinumData;
  }
  getAllGames() {
    return [pokemonRedBlueData, pokemonYellowData, pokemonGoldSiverData, pokemonCrystalData, pokemonRubySapphireData, pokemonEmeraldData, pokemonFireRedLeafGreenData, pokemonDiamondPearlData, pokemonPlatinumData]
  }
}
