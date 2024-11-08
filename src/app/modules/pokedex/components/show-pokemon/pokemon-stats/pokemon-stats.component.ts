import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../../../../../../entities/pokemon.entity';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss'],
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
export class PokemonStatsComponent implements OnInit, OnChanges {
  @Input() language: string;
  @Input() pokemon: Pokemon;
  @Input() pokemonSpecie: PokemonSpecie;

  backgroundColor: string = '';

  totalStats: number = 0;
  statNames: string [];
  filtersVisible = true;

  constructor(private helperService: HelperService,) { }

  ngOnInit() {
    this.getTotalStat();
    this.setStatsNames();
    this.getPokemonColor();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.setStatsNames();
    this.getPokemonColor();
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  getPokemonColor() {
    if (this.pokemonSpecie && this.pokemonSpecie.color) {
      this.backgroundColor = this.helperService.getPokemonColor(this.pokemonSpecie.color.name);
    } else {
      this.backgroundColor = ''; // Asigna una cadena vacía si no hay color
    }
  }

  getStatColor(stat: number): string {
    if (stat >= 150) {
      return '#38b2ac'; // Azul verdoso
    } else if (stat >= 99 && stat <= 149) {
      return '#48bb78'; // Verde
    } else if (stat >= 81 && stat <= 98) {
      return '#ecc94b'; // Amarillo
    } else if (stat > 60 && stat <= 80) {
      return '#ed8936'; // Naranja
    } else {
      return '#f56565'; // Rojo
    }
  }

  setStatsNames(){
    this.statNames = this.language === 'es' ? ['PS', 'Ataque', 'Defensa', 'At. esp', 'Def. esp', 'Velocidad'] : ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];
  }

  getMaxStat(): number {
    return Math.max(...this.pokemon.stats.map(stat => stat.base_stat));
  }

  getStatWidth(stat: number): string {
    const maxStat = this.getMaxStat();
    return (stat / maxStat * 100) + '%';
  }

  getTotalStat() {
    let stats = 0;
    this.pokemon.stats.forEach((pokemonStats) => {
      stats = stats + pokemonStats.base_stat;
    });
    this.totalStats = stats
  }

}
