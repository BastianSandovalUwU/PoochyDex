import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon } from '../../../../../../../entities/pokemon.entity';
import { Localization } from '../../../../../../../entities/localitzation.entity';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Method {
  name: string;
  url: string;
}

interface EncounterDetail {
  chance: number;
  condition_values: any[];
  max_level: number;
  method: Method;
  min_level: number;
}

interface LocationArea {
  name: string;
  url: string;
}

interface Version {
  name: string;
  url: string;
}

interface VersionDetail {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: Version;
}

interface LocationData {
  location_area: LocationArea;
  version_details: VersionDetail[];
}

interface GroupedData {
  versionName: string;
  methods: { [methodName: string]: string[] };
}

@Component({
  selector: 'app-pokemon-localization',
  templateUrl: './pokemon-localization.component.html',
  styleUrls: ['./pokemon-localization.component.scss'],
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
export class PokemonLocalizationComponent implements OnInit, OnChanges {
  @Input() language: string;
  @Input() pokemonSpecie: PokemonSpecie;
  @Input() pokemon: Pokemon;
  backgroundColor: string = '';
  data: LocationData[];
  groupedLocations: GroupedData[] = [];
  expandedVersions: { [key: string]: boolean } = {};
  expandedMethods: { [versionName: string]: { [methodName: string]: boolean } } = {};
  minimumVisibleItems = 20;
  loadInfo: boolean;
  filtersVisible = false;

  constructor(private helperService: HelperService,
              private pokeApiService: PokeApiService
  ) { }

  ngOnInit() {
    this.getPokemonColor();
    this.getPokemonLocalization();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getPokemonColor();
    this.getPokemonLocalization();
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  getPokemonLocalization(): void {
    this.pokeApiService.getPokemonLocalization(this.pokemon.id).subscribe((localizationData) => {
        this.groupedLocations = this.groupByVersionAndMethod(localizationData);
        if(this.groupedLocations.length > 0) {
          this.loadInfo = true;
        } else {
          this.loadInfo = false;
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

  getGameVersionColor(gameVersion: string): string {
    return this.helperService.getGameVersionColor(gameVersion);
  }

  getGameName(gameName: string): string {
    return this.helperService.getGameName(gameName, this.language);
  }

  getGameIconGame(gameName: string): string[] {
    return this.helperService.getGameIconGame(gameName);
  }

  groupByVersionAndMethod(data: LocationData[]): GroupedData[] {
    const groupedData: { [versionName: string]: { [methodName: string]: string[] } } = {};

    // Lista con el orden deseado de los juegos
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

    // Ordenar las versiones usando el orden deseado
    return Object.keys(groupedData)
      .sort((a, b) => gameOrder.indexOf(a) - gameOrder.indexOf(b))
      .map(versionName => ({
        versionName,
        methods: groupedData[versionName]
      }));
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
