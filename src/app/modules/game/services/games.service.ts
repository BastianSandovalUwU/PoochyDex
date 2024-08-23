import { Injectable } from '@angular/core';
import { pokemonCrystalData, pokemonGoldSiverData, pokemonRedBlueData, pokemonRubySapphireData, pokemonYellowData } from '../../../../../entities/common/game-data';

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
}
