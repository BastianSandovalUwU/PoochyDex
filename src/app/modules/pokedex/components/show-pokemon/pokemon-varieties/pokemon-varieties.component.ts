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
  pokemonVarieties: any[];
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
    for (let i = 0; i < this.pokemonSpecie.varieties.length; i++) {
      const sprite = this.helperService.getPokemonSpriteImg(this.pokemonSpecie.varieties[i].pokemon.name, "home");
      const pokeInfo = {
        sprite: sprite,
        name: this.pokemonSpecie.varieties[i].pokemon.name
      }
      pokemonVarieties.push(pokeInfo);
    }
    this.pokemonVarieties = pokemonVarieties;

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
