import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { PokeApiService } from 'app/modules/shared/services/poke-api.service';
import { Pokemon } from '../../../../../../../entities/pokemon.entity';
import { toggleSectionCollapseAnimations } from 'app/modules/shared/animations/toggle-section-collapse.animation';
import { GroupedData, LocationData } from '../../../../../../../entities/localization.entity';
import { ErrorMessageService } from 'app/services/error-message.service';
import { Subject, takeUntil } from 'rxjs';

interface GroupedDataView extends GroupedData {
  versionColor: string;
  versionIcon: string;
}

@Component({
  selector: 'app-pokemon-localization',
  templateUrl: './pokemon-localization.component.html',
  styleUrls: ['./pokemon-localization.component.scss'],
  animations: toggleSectionCollapseAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonLocalizationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() language: string;
  @Input() pokemonSpecie: PokemonSpecie;
  @Input() pokemon: Pokemon;
  backgroundColor: string = '';
  groupedLocations: GroupedDataView[] = [];
  expandedVersions: { [key: string]: boolean } = {};
  expandedMethods: { [versionName: string]: { [methodName: string]: boolean } } = {};
  minimumVisibleItems = 20;
  loadInfo: boolean;
  filtersVisible = false;
  private destroy$ = new Subject<void>();

  constructor(private helperService: HelperService,
              private pokeApiService: PokeApiService,
              private errorMessageService: ErrorMessageService,
              private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getPokemonColor();
    this.getPokemonLocalization();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getPokemonColor();
    if (changes['pokemon']) {
      this.getPokemonLocalization();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  getPokemonLocalization(): void {
    if(this.pokemon.id > 10000) {
      return;
    }
    this.pokeApiService.getPokemonLocalization(this.pokemon.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (localizationData) => {
          this.groupedLocations = this.groupByVersionAndMethod(localizationData);
          this.loadInfo = this.groupedLocations.length > 0;
          this.cdr.markForCheck();
        },
        error: (error) => {
          const errorMessage = this.language === 'es' ? 'Error al cargar la localización' : 'Error loading localization';
          this.errorMessageService.showError(errorMessage, error.message);
        }
      });
  }

  getPokemonColor() {
    if (this.pokemonSpecie && this.pokemonSpecie.color) {
      this.backgroundColor = this.helperService.getPokemonColor(this.pokemonSpecie.color.name);
    } else {
      this.backgroundColor = '';
    }
  }

  groupByVersionAndMethod(data: LocationData[]): GroupedDataView[] {
    const groupedData: { [versionName: string]: { [methodName: string]: string[] } } = {};

    const gameOrder = [
      "red",
      "blue",
      "yellow",
      "silver",
      "gold",
      "crystal",
      "sapphire",
      "ruby",
      "leafgreen",
      "firered",
      "emerald",
      "pearl",
      "diamond",
      "platinum",
      "soulsilver",
      "heartgold",
      "white",
      "black",
      "white-2",
      "black-2",
      "y",
      "x",
      "alpha-sapphire",
      "omega-ruby",
      "moon",
      "sun",
      "ultra-moon",
      "ultra-sun",
      "lets-go-eevee",
      "lets-go-pikachu",
      "shield",
      "sword",
      "shining-pearl",
      "brilliant-diamond",
      "violet",
      "scarlet"
    ];

    data.forEach(location => {
      location.version_details.forEach(versionDetail => {
        const versionName = versionDetail.version.name;

        if (!groupedData[versionName]) {
          groupedData[versionName] = {};
        }

        versionDetail.encounter_details.forEach(encounterDetail => {
          const methodName = encounterDetail.method.name;

          if (!groupedData[versionName][methodName]) {
            groupedData[versionName][methodName] = [];
          }

          groupedData[versionName][methodName].push(location.location_area.name);
        });
      });
    });

    return Object.keys(groupedData)
      .sort((a, b) => gameOrder.indexOf(a) - gameOrder.indexOf(b))
      .map(versionName => ({
        versionName,
        methods: groupedData[versionName],
        versionColor: this.helperService.getGameVersionColor(versionName),
        versionIcon: this.helperService.getGameIconGame(versionName)[0]
      }));
  }

  trackByVersion(_index: number, version: GroupedDataView): string {
    return version.versionName;
  }

  toggleMethod(versionName: string, methodName: string) {
    if (!this.expandedMethods[versionName]) {
      this.expandedMethods[versionName] = {};
    }
    this.expandedMethods[versionName][methodName] = !this.expandedMethods[versionName][methodName];
  }

  isMethodExpanded(versionName: string, methodName: string): boolean {
    return this.expandedMethods[versionName]?.[methodName] || false;
  }

  getVisibleMethodValues(methodValues: string[], versionName: string, methodName: string): string[] {
    if (this.isMethodExpanded(versionName, methodName)) {
      return methodValues;
    }
    return methodValues.slice(0, this.minimumVisibleItems);
  }

  hasMoreMethodItems(methodValues: string[]): boolean {
    return methodValues.length > this.minimumVisibleItems;
  }

}
