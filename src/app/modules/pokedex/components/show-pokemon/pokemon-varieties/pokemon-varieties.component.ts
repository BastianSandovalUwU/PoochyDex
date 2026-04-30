import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { Router } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { PokemonSpriteOption } from '../../../../../../../entities/poochydex-api/pokemon-sprite-option';
import { toggleSectionCollapseAnimations } from 'app/modules/shared/animations/toggle-section-collapse.animation';

@Component({
  selector: 'app-pokemon-varieties',
  templateUrl: './pokemon-varieties.component.html',
  styleUrls: ['./pokemon-varieties.component.scss'],
  animations: toggleSectionCollapseAnimations
})
export class PokemonVarietiesComponent implements OnInit, OnChanges {
  @Input() language: string = 'es';
  @Input() pokemonSpecie: PokemonSpecie;

  backgroundColor: string = '';
  pokemonVarieties: any[];
  pokemonId: string;
  filtersVisible = true;
  loadedSprites = new Set<string>();

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

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  isImageLoaded(url: string): boolean { return this.loadedSprites.has(url); }
  markImageLoaded(url: string): void { this.loadedSprites.add(url); }

  getVarietiesInfo() {
    this.loadedSprites.clear();
    const pokemonVarieties = [];
    for (let i = 0; i < this.pokemonSpecie.varieties.length; i++) {
      const pokeInfo = {
        sprite: '',
        name: this.pokemonSpecie.varieties[i].pokemon.name
      }
      pokemonVarieties.push(pokeInfo);
      this.helperService.getPokemonSpriteImg(this.pokemonSpecie.varieties[i].pokemon.name, PokemonSpriteOption.Home)
        .subscribe(sprite => pokeInfo.sprite = sprite);
    }
    this.pokemonVarieties = pokemonVarieties;
  }

  getPokemonColor() {
    if (this.pokemonSpecie && this.pokemonSpecie.color) {
      this.backgroundColor = this.helperService.getPokemonColor(this.pokemonSpecie.color.name);
    } else {
      this.backgroundColor = '';
    }
  }

  goToPokemonPage(pokemonName: string) {
    this.router.navigate(['/pokedex/show-pokemon/', pokemonName]);
  }

  onVarietyLinkKeydown(event: KeyboardEvent, pokemonName: string): void {
    if (event.key !== 'Enter' && event.code !== 'Space') {
      return;
    }
    event.preventDefault();
    this.goToPokemonPage(pokemonName);
  }

}
