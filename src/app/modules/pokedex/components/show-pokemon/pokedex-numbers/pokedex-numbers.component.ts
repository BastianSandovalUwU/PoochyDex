import { Component, Input, OnInit } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';

@Component({
  selector: 'app-pokedex-numbers',
  templateUrl: './pokedex-numbers.component.html',
  styleUrls: ['./pokedex-numbers.component.scss']
})
export class PokedexNumbersComponent implements OnInit {
  @Input() language: string = 'es';
  @Input() pokemonSpecie: PokemonSpecie;

  backgroundColor: string = '';

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.getPokemonColor();
  }

  getPokemonColor() {
    if (this.pokemonSpecie && this.pokemonSpecie.color) {
      this.backgroundColor = this.helperService.getPokemonColor(this.pokemonSpecie.color.name);
    } else {
      this.backgroundColor = ''; // Asigna una cadena vacía si no hay color
    }
  }


}
