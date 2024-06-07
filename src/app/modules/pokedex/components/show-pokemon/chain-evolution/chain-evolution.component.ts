import { Component, Input, OnInit } from '@angular/core';
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
export class ChainEvolutionComponent implements OnInit {
  @Input() language: string = 'es';
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

  getEvolutionChain() {
    this.pokeApiService.getEvolutionChainByUrl(this.pokemonSpecie.evolution_chain.url).subscribe((evolution) => {
      this.populateEvolutionChainDetails(evolution);
    });
  }

  populateEvolutionChainDetails(evolution: EvolutionChain) {
    this.pokeApiService.getPokemonByName(evolution.chain.species.name).subscribe((species) => {
      evolution.chain.detailPokemon = species;
    });
    if (evolution.chain.evolves_to && evolution.chain.evolves_to.length > 0) {
      evolution.chain.evolves_to.forEach((evolvesTo) => {
        // Obtener detalles de la especie de Pokémon para esta etapa de la cadena de evolución
        this.pokeApiService.getPokemonByName(evolvesTo.species.name).subscribe((species) => {
          evolvesTo.detailPokemon = species;
          // Si hay evoluciones, llamar a la función recursivamente para cada una
        });
        if(evolvesTo.evolves_to && evolvesTo.evolves_to.length > 0) {
          evolvesTo.evolves_to.forEach((evolvesTo2) => {
            this.pokeApiService.getPokemonByName(evolvesTo2.species.name).subscribe((species) => {
              evolvesTo2.detailPokemon = species;
              // Si hay evoluciones, llamar a la función recursivamente para cada una
            });
          }
        )};
      });
    }
    let evolutionChain: EvolutionChain = evolution;
    this.evolutionChain = evolutionChain;
  }

  getPokemonColor() {
    if (this.pokemonSpecie && this.pokemonSpecie.color) {
      this.backgroundColor = this.helperService.getPokemonColor(this.pokemonSpecie.color.name);
    } else {
      this.backgroundColor = ''; // Asigna una cadena vacía si no hay color
    }
  }

  goToPokemonPage(pokemonName: string) {
    this.router.navigate(['/pokedex/show-pokemon/', pokemonName]); // Reemplaza con la ruta deseada
  }


}
