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
    let pokemonName: string = '';
    this.pokeApiService.getPokemonByName(evolution.chain.species.name).subscribe({
      next: (pokeInfo) => {
        pokemonName = pokeInfo.name;
        evolution.chain.pokemonName = pokemonName;
        const sprite = this.helperService.getPokemonSpriteImg(evolution.chain.species.name, "home");
        evolution.chain.imageName = sprite;
      },
      error: (error) => {
        const errorMessage = this.language === 'es' ? 'Error al cargar el Pokémon' : 'Error loading Pokémon';
        this.errorMessageService.showError(errorMessage, error.message);
      }
    });

    if (evolution.chain.evolves_to && evolution.chain.evolves_to.length > 0) {

      evolution.chain.evolves_to.forEach((evolvesTo) => {
        let pokemonName2: string = '';
        this.pokeApiService.getPokemonByName(evolvesTo.species.name).subscribe({
          next: (pokeInfo) => {
            pokemonName2 = pokeInfo.name;
            evolvesTo.pokemonName = pokemonName2;
            const sprite2 = this.helperService.getPokemonSpriteImg(pokemonName2, "home");
            evolvesTo.imageName = sprite2;
          },
          error: (error) => {
            const errorMessage = this.language === 'es' ? 'Error al cargar el Pokémon' : 'Error loading Pokémon';
            this.errorMessageService.showError(errorMessage, error.message);
          }
        });

        if(evolvesTo.evolves_to && evolvesTo.evolves_to.length > 0) {
            evolvesTo.evolves_to.forEach((evolvesTo2) => {
            let pokemonName3: string = '';
            this.pokeApiService.getPokemonByName(evolvesTo2.species.name).subscribe({
              next: (pokeInfo) => {
                pokemonName3 = pokeInfo.name;
                evolvesTo2.pokemonName = pokemonName3;
                const sprite3 = this.helperService.getPokemonSpriteImg(pokemonName3, "home");
                evolvesTo2.imageName = sprite3;
              },
              error: (error) => {
                const errorMessage = this.language === 'es' ? 'Error al cargar el Pokémon' : 'Error loading Pokémon';
                this.errorMessageService.showError(errorMessage, error.message);
              }
            });

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
