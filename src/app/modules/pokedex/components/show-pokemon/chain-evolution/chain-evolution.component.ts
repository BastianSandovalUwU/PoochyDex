import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { EvolutionChain } from '../../../../../../../entities/evolution-chain.entity';
import { Router } from '@angular/router';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ErrorMessageService } from 'app/services/error-message.service';

@Component({
  selector: 'app-chain-evolution',
  templateUrl: './chain-evolution.component.html',
  styleUrls: ['./chain-evolution.component.scss'],
  animations: [
    trigger('toggleFilters', [
      state('visible', style({
        height: '*',
        opacity: 1
      })),
      state('hidden', style({
        height: '0px',
        opacity: 0
      })),
      transition('visible <=> hidden', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ChainEvolutionComponent implements OnInit, OnChanges {
  @Input() language: string;
  @Input() pokemonSpecie: PokemonSpecie;

  evolutionChain: EvolutionChain;
  backgroundColor: string = '';
  filtersVisible = true;

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

  getEvolutionChain() {
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
    this.helperService.getPokemonSpriteImg(evolution.chain.species.name, "home")
      .subscribe(sprite => evolution.chain.imageName = sprite);

    if(evolution.chain.evolves_to && evolution.chain.evolves_to.length > 0) {
      evolution.chain.evolves_to.forEach((evolvesTo) => {
        this.helperService.getPokemonSpriteImg(evolvesTo.species.name, "home")
          .subscribe(sprite2 => evolvesTo.imageName = sprite2);

        if(evolvesTo.evolves_to && evolvesTo.evolves_to.length > 0) {
            evolvesTo.evolves_to.forEach((evolvesTo2) => {
              this.helperService.getPokemonSpriteImg(evolvesTo2.species.name, "home")
                .subscribe(sprite3 => evolvesTo2.imageName = sprite3);
          })
        };

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


}
