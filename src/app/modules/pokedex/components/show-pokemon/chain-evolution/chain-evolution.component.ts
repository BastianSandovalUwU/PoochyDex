import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { EvolutionChain } from '../../../../../../../entities/evolution-chain.entity';
import { Router } from '@angular/router';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { toggleSectionCollapseAnimations } from 'app/modules/shared/animations/toggle-section-collapse.animation';
import { ErrorMessageService } from 'app/services/error-message.service';
import { PokemonSpriteOption } from '../../../../../../../entities/poochydex-api/pokemon-sprite-option';

@Component({
  selector: 'app-chain-evolution',
  templateUrl: './chain-evolution.component.html',
  styleUrls: ['./chain-evolution.component.scss'],
  animations: toggleSectionCollapseAnimations
})
export class ChainEvolutionComponent implements OnInit, OnChanges {
  @Input() language: string;
  @Input() pokemonSpecie: PokemonSpecie;

  evolutionChain: EvolutionChain;
  backgroundColor: string = '';
  filtersVisible = true;
  loadedSprites = new Set<string>();

  constructor(private pokeApiService: PokeApiService,
    private helperService: HelperService,
    private router: Router,
    private errorMessageService: ErrorMessageService) { }

  ngOnInit() {
    this.getPokemonColor();
    this.getEvolutionChain();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getPokemonColor();
    this.getEvolutionChain();
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  isImageLoaded(url: string): boolean { return this.loadedSprites.has(url); }
  markImageLoaded(url: string): void { this.loadedSprites.add(url); }

  getEvolutionChain() {
    this.loadedSprites.clear();
    this.pokeApiService.getEvolutionChainByUrl(this.pokemonSpecie.evolution_chain.url).subscribe({
      next: (evolution) => {
        this.populateEvolutionChainDetails(evolution);
      },
      error: (error) => {
        const errorMessage = this.language === 'es' ? 'Error al cargar la cadena de evolución' : 'Error loading evolution chain';
        this.errorMessageService.showError(errorMessage, error.message);
      }
    });
  }

  populateEvolutionChainDetails(evolution: EvolutionChain) {
    this.helperService.getPokemonSpriteImg(evolution.chain.species.name, PokemonSpriteOption.Home)
      .subscribe(sprite => evolution.chain.imageName = sprite);

    if(evolution.chain.evolves_to && evolution.chain.evolves_to.length > 0) {
      evolution.chain.evolves_to.forEach((evolvesTo) => {
        this.helperService.getPokemonSpriteImg(evolvesTo.species.name, PokemonSpriteOption.Home)
          .subscribe(sprite2 => evolvesTo.imageName = sprite2);

        if(evolvesTo.evolves_to && evolvesTo.evolves_to.length > 0) {
            evolvesTo.evolves_to.forEach((evolvesTo2) => {
              this.helperService.getPokemonSpriteImg(evolvesTo2.species.name, PokemonSpriteOption.Home)
                .subscribe(sprite3 => evolvesTo2.imageName = sprite3);
          })
        }

      });
    }

    let evolutionChain: EvolutionChain = evolution;
    this.evolutionChain = evolutionChain;
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

  onNavigateKeydown(event: KeyboardEvent, pokemonName: string): void {
    if (event.key !== 'Enter' && event.code !== 'Space') {
      return;
    }
    event.preventDefault();
    this.goToPokemonPage(pokemonName);
  }

}
