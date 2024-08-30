import { Component, OnInit } from '@angular/core';
import { CreatePokemon, PoochyDexApiService } from '../../services/poochyDexApi.service';
import { ALL_POKEMON_JOTHO, ALL_POKEMON_KANTO } from '../../../../../../entities/common/poochyApiData';

@Component({
  selector: 'app-crud-api',
  templateUrl: './crud-api.component.html',
  styleUrls: ['./crud-api.component.scss']
})
export class CrudApiComponent implements OnInit {

  kantoPokemon: CreatePokemon[] = ALL_POKEMON_KANTO;
  jothoPokemon: CreatePokemon[] = ALL_POKEMON_JOTHO;

  constructor(private poochyDexApiService: PoochyDexApiService) { }

  ngOnInit() {
    // this.poochyDexApiService.getAllPokemon().subscribe((resp) => {
    //   console.log(resp);
    // })
  }

  createPokemonData(): void {
    this.updateBD(this.kantoPokemon);
  }
  createPokemonDataJotho(): void {
    this.updateBD(this.jothoPokemon);
  }

    async updateBD(data: any) {
    for (const poke of data) {
      try {
        const result = await this.poochyDexApiService.postPokemonAzure(poke).toPromise();
        console.log(result);
      } catch (error) {
        console.error('Error al guardar Pokémon:', error);
      }
    }
  }

}
