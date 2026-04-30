import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FilteredByEgg, FilteredByMachine, FilteredByTutor } from '../../../../../entities/moves.entity';
import { TabItem } from '../custom-tabs/custom-tabs.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { toggleSectionCollapseAnimations } from '../animations/toggle-section-collapse.animation';

@Component({
  selector: 'app-pokemon-moves-table',
  templateUrl: './pokemon-moves-table.component.html',
  styleUrls: ['./pokemon-moves-table.component.scss'],
  animations: toggleSectionCollapseAnimations
})
export class PokemonMovesTableComponent implements OnChanges {
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
  @Output() tabChangeEvent = new EventEmitter<MatTabChangeEvent | { index: number; value: any }>();

  // Handlers wired from the parent component
  @Input() getGameName: (gameName: string) => string;
  @Input() getGameIconGame: (gameName: string) => string[];
  @Input() getGameVersionColor: (gameVersion: string) => string;
  @Input() getTypeName: (pokeMove: any) => string;

  selectedVersionGroup: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTabIndex'] && this.versionGroups.length > 0) {
      const index = changes['selectedTabIndex'].currentValue;
      if (index >= 0 && index < this.versionGroups.length) {
        this.selectedVersionGroup = this.versionGroups[index];
      }
    }
    if (changes['versionGroups'] && this.versionGroups.length > 0 && !this.selectedVersionGroup) {
      const index = this.selectedTabIndex >= 0 && this.selectedTabIndex < this.versionGroups.length
        ? this.selectedTabIndex
        : 0;
      this.selectedVersionGroup = this.versionGroups[index];
    }
  }

  getTabs(): TabItem[] {
    return this.versionGroups.map(group => ({
      label: this.getGameName(group),
      value: group
    }));
  }

  onToggleFilters(): void {
    this.toggleFiltersEvent.emit();
  }

  onTabChange(event: MatTabChangeEvent | { index: number; value: any }): void {
    const index = (event as any).index !== undefined ? (event as any).index : (event as MatTabChangeEvent).index;
    this.selectedVersionGroup = this.versionGroups[index];
    this.selectedTabIndex = index;
    this.tabChangeEvent.emit(event);
  }
}

