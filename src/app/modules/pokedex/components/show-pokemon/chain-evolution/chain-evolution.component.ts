import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { EvolutionChain } from '../../../../../../../entities/evolution-chain.entity.';
import { Router } from '@angular/router';
import { HelperService } from 'app/modules/shared/services/helper.service';

@Component({
  selector: 'app-chain-evolution',
  templateUrl: './chain-evolution.component.html',
  styleUrls: ['./chain-evolution.component.scss']
})
export class ChainEvolutionComponent implements OnInit, OnChanges {
  @Input() language: string;
  @Input() pokemonSpecie: PokemonSpecie;

  evolutionChain: EvolutionChain;
  backgroundColor: string = '';

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

  getEvolutionChain() {
    this.pokeApiService.getEvolutionChainByUrl(this.pokemonSpecie.evolution_chain.url).subscribe((evolution) => {
      this.populateEvolutionChainDetails(evolution);
    });
  }

  populateEvolutionChainDetails(evolution: EvolutionChain) {
    evolution.chain.pokemonName = evolution.chain.species.name;
    const pokeImgname = this.helperService.getPokemonSpriteImg(evolution.chain.species.name);
    evolution.chain.imageName = pokeImgname;

    if (evolution.chain.evolves_to && evolution.chain.evolves_to.length > 0) {

      evolution.chain.evolves_to.forEach((evolvesTo) => {
        evolution.chain.pokemonName = evolvesTo.species.name;
        const pokeImgname = this.helperService.getPokemonSpriteImg(evolvesTo.species.name);
        evolvesTo.imageName = pokeImgname;

        if(evolvesTo.evolves_to && evolvesTo.evolves_to.length > 0) {
            evolvesTo.evolves_to.forEach((evolvesTo2) => {
            const pokeImgname = this.helperService.getPokemonSpriteImg(evolvesTo2.species.name);
            evolvesTo2.imageName = pokeImgname;
          })
        };

      });
    }

    let evolutionChain: EvolutionChain = evolution;
    this.evolutionChain = evolutionChain;
    console.log(this.evolutionChain);
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
