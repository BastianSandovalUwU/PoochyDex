import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { Router } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon } from '../../../../../../../entities/pokemon.entity';

@Component({
  selector: 'app-pokemon-varieties',
  templateUrl: './pokemon-varieties.component.html',
  styleUrls: ['./pokemon-varieties.component.scss']
})
export class PokemonVarietiesComponent implements OnInit, OnChanges {
  @Input() language: string = 'es';
  @Input() pokemonSpecie: PokemonSpecie;

  backgroundColor: string = '';
  pokemonVarieties: Pokemon[];
  pokemonId: string;

  constructor(private helperService: HelperService,
              private pokeApiService: PokeApiService,
              private router: Router) { }

  ngOnInit() {
    this.getPokemonColor();
    this.getVarietiesInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.getVarietiesInfo();
      this.getPokemonColor();
  }

  getVarietiesInfo() {

    const pokemonVarieties = [];
    console.log(this.pokemonSpecie.varieties);
    for (let i = 0; i < this.pokemonSpecie.varieties.length; i++) {
      const pokeId = this.helperService.getPokemonIdNumber(this.pokemonSpecie.varieties[i].pokemon.name);
      // this.pokeApiService.getPokemonByName(this.pokemonSpecie.varieties[i].pokemon.name).subscribe((pokeInfo) => {
      //   if(pokeInfo.is_default === false) {
      const pokeInfo = {
        id: pokeId,
        name: this.pokemonSpecie.varieties[i].pokemon.name
      }
      pokemonVarieties.push(pokeInfo);
      //     }
      // });
    }
    this.pokemonVarieties = pokemonVarieties;
    console.log(this.pokemonVarieties);

  }

  getPokemonColor() {
    if (this.pokemonSpecie && this.pokemonSpecie.color) {
      this.backgroundColor = this.helperService.getPokemonColor(this.pokemonSpecie.color.name);
    } else {
      this.backgroundColor = ''; // Asigna una cadena vacía si no hay color
    }
  }

  goToPokemonPage(pokemonName: string) {
    this.router.navigate(['/pokedex/show-pokemon/', pokemonName]); // Reemplaza con la ruta deseada
  }

}
