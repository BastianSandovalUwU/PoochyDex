import { Component, OnInit } from '@angular/core';
import { CreatePokemon, PoochyDexApiService } from '../../services/poochyDexApi.service';
import { ALL_POKEMON_ALOLA, ALL_POKEMON_HOENN, ALL_POKEMON_JOTHO, ALL_POKEMON_KALOS, ALL_POKEMON_KANTO, ALL_POKEMON_SINNOH, ALL_POKEMON_UNOVA } from '../../../../../../entities/common/poochyApiData';
import { Games, pokemonBlackWithe2Data, pokemonBlackWitheData, pokemonCrystalData, pokemonDiamondPearlData, pokemonEmeraldData, pokemonFireRedLeafGreenData, pokemonGoldSiverData, pokemonHeartGoldSoulSilverData, pokemonPlatinumData, pokemonRedBlueData, pokemonRubySapphireData, pokemonYellowData } from '../../../../../../entities/common/game-data';
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
  sinnohPokemon: CreatePokemon[] = ALL_POKEMON_SINNOH;
  unovaPokemon: CreatePokemon[] = ALL_POKEMON_UNOVA;
  kalosPokemon: CreatePokemon[] = ALL_POKEMON_KALOS;
  alolaPokemon: CreatePokemon[] = ALL_POKEMON_ALOLA;

  firstGenerationGames: Games[] = [pokemonRedBlueData, pokemonYellowData];
  secondGenerationGames: Games[] = [pokemonGoldSiverData, pokemonCrystalData];
  thirdGenerationGames: Games[] = [pokemonRubySapphireData, pokemonEmeraldData, pokemonFireRedLeafGreenData];
  fourthGenerationGames: Games[] = [pokemonDiamondPearlData, pokemonPlatinumData, pokemonHeartGoldSoulSilverData];
  fifthGenerationGames: Games[] = [pokemonBlackWitheData, pokemonBlackWithe2Data];

  // urlData: any[] = urlsAlola;
  allPokemonAPI: PokemonApi[] = [];

  constructor(private poochyDexApiService: PoochyDexApiService) { }

  ngOnInit() {
    this.getAllPokemon();
  }

  getAllPokemon(): void {
    this.poochyDexApiService.getAllPokemon().subscribe((resp) => {
      this.allPokemonAPI = resp;
      // console.log(resp.filter(f => f.generationId === 4).map((map) => {
      //   return {
      //     name: map.name,
      //     imageURL: map.imageURL,
      //     number: map.number,
      //     generationId: map.generationId,
      //     type: map.type,
      //     type2: map.type2,
      //   }
      // }))
    }, (error => {
      console.log(error);
    }));
  }

  createPokemonByGeneration(generationId: number) {
    switch (generationId) {
      case 1:
        // this.createPokemonBD(this.kantoPokemon);
        break;
      case 2:
        // this.createPokemonBD(this.jothoPokemon);
        break;
      case 3:
        // this.createPokemonBD(this.hoennPokemon);
        break;
      case 4:
        // this.createPokemonBD(this.sinnohPokemon);
        break;
      case 5:
        // this.createPokemonBD(this.unovaPokemon);
        break;
      case 6:
        // this.createPokemonBD(this.kalosPokemon);
        break;
      case 7:
        // this.createPokemonBD(this.alolaPokemon);
        break;
      default:
        break;
    }
  }

  createGenerationGamesData(generation: number): void {
    switch (generation) {
      case 1:
        console.log(this.firstGenerationGames);
        // this.createGame(this.firstGenerationGames);
        break;
      case 2:
        console.log(this.secondGenerationGames);
        // this.createGame(this.secondGenerationGames);
        break;
      case 3:
        console.log(this.thirdGenerationGames);
        // this.createGame(this.thirdGenerationGames);
        break;
      case 4:
        console.log(this.fourthGenerationGames);
        // this.createGame(this.fourthGenerationGames);
        break;
      case 5:
        console.log(this.fifthGenerationGames);
        // this.createGame(this.fifthGenerationGames);
        break;

      default:
        break;
    }
  }

  async updateUrlImagePokemon(allPokemon: PokemonApi[], urlData: any ,generation: number) {
    const pokemonFiltered = allPokemon.filter(f => f.generationId === generation);
    console.log(pokemonFiltered);
    console.log(urlData);
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
