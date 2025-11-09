import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FilteredByEgg, FilteredByMachine, FilteredByTutor } from '../../../../../entities/moves.entity';

@Component({
  selector: 'app-pokemon-moves-table',
  templateUrl: './pokemon-moves-table.component.html',
  styleUrls: ['./pokemon-moves-table.component.scss'],
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
export class PokemonMovesTableComponent {
  @Input() language: string = 'es';
  @Input() titleEs: string = '';
  @Input() titleEn: string = '';
  @Input() subtitleEs: string = '';
  @Input() subtitleEn: string = '';
  @Input() backgroundColor: string = '';
  @Input() filtersVisible: boolean = true;
  @Input() versionGroups: string[] = [];
  @Input() selectedTabIndex: number = 0;
  @Input() filteredMoves: (FilteredByMachine | FilteredByTutor | FilteredByEgg)[] = [];
  @Input() moveType: 'machine' | 'tutor' | 'egg' = 'machine';

  @Output() toggleFiltersEvent = new EventEmitter<void>();
  @Output() tabChangeEvent = new EventEmitter<MatTabChangeEvent>();

  // Métodos auxiliares que se pasan desde el componente padre
  @Input() getGameName: (gameName: string) => string;
  @Input() getGameIconGame: (gameName: string) => string[];
  @Input() getGameVersionColor: (gameVersion: string) => string;
  @Input() getTypeName: (pokeMove: any) => string;

  onToggleFilters(): void {
    this.toggleFiltersEvent.emit();
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.tabChangeEvent.emit(event);
  }
}

