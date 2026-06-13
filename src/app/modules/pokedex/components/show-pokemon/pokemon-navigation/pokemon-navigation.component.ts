import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { detailFadeInAnimations } from 'app/modules/shared/animations/detail-fade-in.animation';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { Pokemon } from '../../../../../../../entities/pokemon.entity';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';

/** National dex id of the last known Pokémon (Gen IX, Pecharunt). */
const MAX_POKEMON_ID = 1025;

@Component({
  selector: 'app-pokemon-navigation',
  templateUrl: './pokemon-navigation.component.html',
  styleUrls: ['./pokemon-navigation.component.scss'],
  animations: detailFadeInAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonNavigationComponent implements OnChanges {
  @Input() pokemon: Pokemon;
  @Input() pokemonSpecie: PokemonSpecie;
  @Input() language: string;

  previousPokemonId?: number;
  nextPokemonId?: number;
  backgroundColor: string = '';

  constructor(private helperService: HelperService) { }

  ngOnChanges(_changes: SimpleChanges): void {
    if (!this.pokemon) {
      this.previousPokemonId = undefined;
      this.nextPokemonId = undefined;
    } else {
      this.previousPokemonId = this.pokemon.id > 1 ? this.pokemon.id - 1 : undefined;
      this.nextPokemonId = this.pokemon.id < MAX_POKEMON_ID ? this.pokemon.id + 1 : undefined;
    }

    this.backgroundColor = this.pokemonSpecie?.color
      ? this.helperService.getPokemonColor(this.pokemonSpecie.color.name)
      : '';
  }
}
