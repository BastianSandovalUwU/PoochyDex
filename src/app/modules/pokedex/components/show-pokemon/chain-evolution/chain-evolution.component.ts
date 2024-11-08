import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { EvolutionChain } from '../../../../../../../entities/evolution-chain.entity';
import { Router } from '@angular/router';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
    private router: Router) { }

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
    this.pokeApiService.getEvolutionChainByUrl(this.pokemonSpecie.evolution_chain.url).subscribe((evolution) => {
      this.populateEvolutionChainDetails(evolution);
    });
  }

  populateEvolutionChainDetails(evolution: EvolutionChain) {
    evolution.chain.pokemonName = evolution.chain.species.name;
    const sprite = this.helperService.getPokemonSpriteImg(evolution.chain.species.name, "home");
    evolution.chain.imageName = sprite;

    if (evolution.chain.evolves_to && evolution.chain.evolves_to.length > 0) {

      evolution.chain.evolves_to.forEach((evolvesTo) => {
        evolution.chain.pokemonName = evolvesTo.species.name;
        const sprite = this.helperService.getPokemonSpriteImg(evolvesTo.species.name, "home");
        evolvesTo.imageName = sprite;

        if(evolvesTo.evolves_to && evolvesTo.evolves_to.length > 0) {
            evolvesTo.evolves_to.forEach((evolvesTo2) => {
            const sprite = this.helperService.getPokemonSpriteImg(evolvesTo2.species.name, "home");
            evolvesTo2.imageName = sprite;
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
