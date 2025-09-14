import { Component, OnInit } from '@angular/core';
import { PoochyDexApiService } from '../../services/poochyDexApi.service';

@Component({
  selector: 'app-crud-api',
  templateUrl: './crud-api.component.html',
  styleUrls: ['./crud-api.component.scss']
})
export class CrudApiComponent implements OnInit {

  constructor(private poochyDexApiService: PoochyDexApiService) { }

  ngOnInit() {
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
