import { Component, OnInit } from '@angular/core';
import { PoochyDexApiService } from '../../services/poochyDexApi.service';
import { Games, pokemonCrystalData, pokemonEmeraldData, pokemonFireRedLeafGreenData, pokemonGoldSiverData, pokemonRedBlueData, pokemonRubySapphireData, pokemonYellowData } from '../../../../../../entities/common/game-data';
import { PokemonList } from '../../../../../../entities/pokemon-list.entity';
import { ALL_POKEMON_HOENN } from '../../../../../../entities/common/hoenn-pokemon-data';
import { ALL_POKEMON_JOTHO } from '../../../../../../entities/common/jotho-pokemon-data';
import { ALL_POKEMON_KANTO } from '../../../../../../entities/common/kanto-pokemon-data';

@Component({
  selector: 'app-crud-api',
  templateUrl: './crud-api.component.html',
  styleUrls: ['./crud-api.component.scss']
})
export class CrudApiComponent implements OnInit {

  kantoPokemon: PokemonList[] = ALL_POKEMON_KANTO;
  jothoPokemon: PokemonList[] = ALL_POKEMON_JOTHO;
  hoennPokemon: PokemonList[] = ALL_POKEMON_HOENN;

  firstGenerationGames: Games[] = [pokemonRedBlueData, pokemonYellowData];
  secondGenerationGames: Games[] = [pokemonGoldSiverData, pokemonCrystalData];
  thirdGenerationGames: Games[] = [pokemonRubySapphireData, pokemonEmeraldData, pokemonFireRedLeafGreenData];


  constructor(private poochyDexApiService: PoochyDexApiService) { }

  ngOnInit() {
    // this.poochyDexApiService.getAllPokemon().subscribe((resp) => {
    //   console.log(resp);
    // })
  }

  createPokemonData(): void {
    this.createPokemonBD(this.kantoPokemon);
  }
  createPokemonDataJotho(): void {
    this.createPokemonBD(this.jothoPokemon);
  }
  createPokemonDataHoenn(): void {
    this.createPokemonBD(this.hoennPokemon);
  }

  createGenerationGamesData(generation: number): void {
    switch (generation) {
      case 1:
        console.log(this.firstGenerationGames);
        this.createGame(this.firstGenerationGames);
        break;
      case 2:
        console.log(this.secondGenerationGames);
        this.createGame(this.secondGenerationGames);
        break;
      case 3:
        console.log(this.thirdGenerationGames);
        this.createGame(this.thirdGenerationGames);
        break;

      default:
        break;
    }
  }

  async createGame(games: Games[]) {
    for (const game of games) {
      try {
        const result = await this.poochyDexApiService.postPokemonVideogame(game).toPromise();
        console.log(result);
      } catch (error) {
        console.error('Error al guardar juego:', error);
      }
    }
  }

  async createPokemonBD(data: any) {
    for (const poke of data) {
      try {
        const result = await this.poochyDexApiService.postPokemonApi(poke).toPromise();
        console.log(result);
      } catch (error) {
        console.error('Error al guardar Pokémon:', error);
      }
    }
  }

}
