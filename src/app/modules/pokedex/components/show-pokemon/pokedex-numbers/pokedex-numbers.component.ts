import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { toggleSectionCollapseAnimations } from 'app/modules/shared/animations/toggle-section-collapse.animation';

@Component({
  selector: 'app-pokedex-numbers',
  templateUrl: './pokedex-numbers.component.html',
  styleUrls: ['./pokedex-numbers.component.scss'],
  animations: toggleSectionCollapseAnimations
})
export class PokedexNumbersComponent implements OnInit, OnChanges {
  @Input() language: string;
  @Input() pokemonSpecie: PokemonSpecie;

  backgroundColor: string = '';
  filtersVisible = false;

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.getPokemonColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.getPokemonColor();
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  getPokemonColor() {
    if (this.pokemonSpecie && this.pokemonSpecie.color) {
      this.backgroundColor = this.helperService.getPokemonColor(this.pokemonSpecie.color.name);
    } else {
      this.backgroundColor = '';
    }
  }


}
