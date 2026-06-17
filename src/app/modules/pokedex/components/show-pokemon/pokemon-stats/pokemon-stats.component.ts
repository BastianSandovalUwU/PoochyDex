import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../../../../../../entities/pokemon.entity';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { toggleSectionCollapseAnimations } from 'app/modules/shared/animations/toggle-section-collapse.animation';

interface StatView {
  name: string;
  baseStat: number;
  width: string;
  color: string;
}

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss'],
  animations: toggleSectionCollapseAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonStatsComponent implements OnInit, OnChanges {
  @Input() language: string;
  @Input() pokemon: Pokemon;
  @Input() pokemonSpecie: PokemonSpecie;

  backgroundColor: string = '';

  totalStats: number = 0;
  statNames: string [];
  statViews: StatView[] = [];
  filtersVisible = true;

  constructor(private helperService: HelperService,) { }

  ngOnInit() {
    this.getTotalStat();
    this.setStatsNames();
    this.buildStatViews();
    this.getPokemonColor();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon']) {
      this.getTotalStat();
    }
    this.setStatsNames();
    this.buildStatViews();
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

  buildStatViews(): void {
    if (!this.pokemon?.stats) {
      this.statViews = [];
      return;
    }
    const maxStat = this.getMaxStat();
    this.statViews = this.pokemon.stats.map((stat, i) => ({
      name: this.statNames[i],
      baseStat: stat.base_stat,
      width: (stat.base_stat / maxStat * 100) + '%',
      color: this.getStatColor(stat.base_stat)
    }));
  }

  trackByStat(index: number): number {
    return index;
  }

  getMaxStat(): number {
    return Math.max(...this.pokemon.stats.map(stat => stat.base_stat));
  }

  getTotalStat() {
    let stats = 0;
    this.pokemon.stats.forEach((pokemonStats) => {
      stats = stats + pokemonStats.base_stat;
    });
    this.totalStats = stats
  }

}
