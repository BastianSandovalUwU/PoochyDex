import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon } from '../../../../../../../entities/pokemon.entity';
import { Localization } from '../../../../../../../entities/localitzation.entity';

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
  styleUrls: ['./pokemon-localization.component.scss']
})
export class PokemonLocalizationComponent implements OnInit, OnChanges {
  @Input() language: string;
  @Input() pokemonSpecie: PokemonSpecie;
  @Input() pokemon: Pokemon;
  backgroundColor: string = '';
  data: LocationData[];
  groupedLocations: GroupedData[] | null = null;


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

  getPokemonLocalization(): void {
    this.pokeApiService.getPokemonLocalization(this.pokemon.id).subscribe((localizationData) => {
        this.groupedLocations = this.groupByVersionAndMethod(localizationData);
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

  groupByVersionAndMethod(data: LocationData[]): GroupedData[] {
    const groupedData: { [versionName: string]: { [methodName: string]: string[] } } = {};

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

    return Object.keys(groupedData).map(versionName => ({
      versionName,
      methods: groupedData[versionName]
    }));
  }

}
