import { Component, OnInit } from '@angular/core';
import { CreatePokemon, PoochyDexApiService } from '../../services/poochyDexApi.service';
import { ALL_POKEMON_HOENN, ALL_POKEMON_JOTHO, ALL_POKEMON_KANTO } from '../../../../../../entities/common/poochyApiData';
import { Games, pokemonCrystalData, pokemonEmeraldData, pokemonFireRedLeafGreenData, pokemonGoldSiverData, pokemonRedBlueData, pokemonRubySapphireData, pokemonYellowData } from '../../../../../../entities/common/game-data';
import { PokemonApi } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'app-crud-api',
  templateUrl: './crud-api.component.html',
  styleUrls: ['./crud-api.component.scss']
})
export class CrudApiComponent implements OnInit {

  kantoPokemon: CreatePokemon[] = ALL_POKEMON_KANTO;
  jothoPokemon: CreatePokemon[] = ALL_POKEMON_JOTHO;
  hoennPokemon: CreatePokemon[] = ALL_POKEMON_HOENN;

  firstGenerationGames: Games[] = [pokemonRedBlueData, pokemonYellowData];
  secondGenerationGames: Games[] = [pokemonGoldSiverData, pokemonCrystalData];
  thirdGenerationGames: Games[] = [pokemonRubySapphireData, pokemonEmeraldData, pokemonFireRedLeafGreenData];

  // urlData: any[] = allPokemonUrl;
  allPokemonAPI: PokemonApi[] = [];

  constructor(private poochyDexApiService: PoochyDexApiService) { }

  ngOnInit() {
    this.getAllPokemon();
  }

  getAllPokemon(): void {
    this.poochyDexApiService.getAllPokemon().subscribe((resp) => {
      this.allPokemonAPI = resp;
    }, (error => {
      console.log(error);
    }));
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

  async updateUrlImagePokemon(allPokemon: PokemonApi[], urlData: string[]) {
    // Filtrar los Pokémon de la generación 3
    const pokemonFiltered = allPokemon.filter(f => f.generationId === 3);

    // Verificar que urlData tenga suficientes URLs para todos los Pokémon filtrados
    if (pokemonFiltered.length !== urlData.length) {
      console.error('La cantidad de URLs no coincide con la cantidad de Pokémon filtrados.');
      return;
    }

    // Actualizar la URL de imagen de cada Pokémon
    for (let index = 0; index < pokemonFiltered.length; index++) {
      const pokemon = pokemonFiltered[index];
      const imageUrl = urlData[index];

      try {
        const pokemonData: PokemonApi = {
          generationId: pokemon.generationId,
          imageURL: imageUrl,
          name: pokemon.name,
          number: pokemon.number,
          type: pokemon.type,
          type2: pokemon.type2 !== null ? pokemon.type2 : null,
        };
        const result = await this.poochyDexApiService.updatePokemon(pokemon.number, pokemonData).toPromise();
        console.log(result);
      } catch (error) {
        console.error('Error al guardar Pokémon:', error);
      }
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
