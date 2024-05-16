import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon } from '../../../../../../entities/pokemon.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';

@Component({
  selector: 'app-show-pokemon',
  templateUrl: './show-pokemon.component.html',
  styleUrls: ['./show-pokemon.component.scss']
})
export class ShowPokemonComponent implements OnInit {

  pokemonName: string;
  pokemon: Pokemon;
  pokemontypes: { language: string, typeName: string }[][];

  constructor(private pokeApiService: PokeApiService,
              private helperService: HelperService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ name }) => {
      this.pokemonName = name;
      this.getPokemonByName();
    });
  }

  getPokemonByName() {
    this.pokeApiService.getPokemonByName(this.pokemonName).subscribe((pokeInfo) => {
      console.log(pokeInfo);
      this.pokemon = pokeInfo;
      this.helperService.translatePokemonTypes(this.pokemon.types).subscribe((types) => {
        console.log(types);
        this.pokemontypes = types;
      });
    });
  }

  getTypeColorClass(typeName: string): string {
    switch (typeName.toLowerCase()) {
      case 'planta':
        return 'bg-green-500';
      case 'fuego':
        return 'bg-red-500';
      case 'agua':
        return 'bg-blue-500';
      case 'veneno':
        return 'bg-pink-500';
      case 'lucha':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500'; // Color por defecto para tipos desconocidos
    }
  }

}
