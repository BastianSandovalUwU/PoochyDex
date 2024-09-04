import { Component, OnInit } from '@angular/core';
import { CreatePokemon, PoochyDexApiService } from '../../services/poochyDexApi.service';
import { ALL_POKEMON_JOTHO, ALL_POKEMON_KANTO } from '../../../../../../entities/common/poochyApiData';
import { Games, pokemonCrystalData, pokemonEmeraldData, pokemonFireRedLeafGreenData, pokemonGoldSiverData, pokemonRedBlueData, pokemonRubySapphireData, pokemonYellowData } from '../../../../../../entities/common/game-data';

@Component({
  selector: 'app-crud-api',
  templateUrl: './crud-api.component.html',
  styleUrls: ['./crud-api.component.scss']
})
export class CrudApiComponent implements OnInit {

  kantoPokemon: CreatePokemon[] = ALL_POKEMON_KANTO;
  jothoPokemon: CreatePokemon[] = ALL_POKEMON_JOTHO;

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
    return;
    this.updateBD(this.kantoPokemon);
  }
  createPokemonDataJotho(): void {
    return;
    this.updateBD(this.jothoPokemon);
  }

  createGenerationGamesData(generation: number): void {
    switch (generation) {
      case 1:
        console.log(this.firstGenerationGames);
        break;
      case 2:
        console.log(this.secondGenerationGames);
        break;
      case 3:
        console.log(this.thirdGenerationGames);
        break;

      default:
        break;
    }
  }

  async updateBD(data: any) {
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
