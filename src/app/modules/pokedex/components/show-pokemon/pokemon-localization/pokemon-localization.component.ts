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

interface ConditionValue {
  name: string;
  url: string;
}

interface EncounterDetail {
  chance: number;
  condition_values: ConditionValue[];
  max_level: number;
  method: Method;
  min_level: number;
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

interface LocationArea {
  name: string;
  url: string;
}

interface LocationData {
  location_area: LocationArea;
  version_details: VersionDetail[];
}

interface GroupedData {
  [versionName: string]: {
    location_area: LocationArea;
    encounter_details: EncounterDetail[];
    max_chance: number;
  }[];
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
  groupedLocations: any;

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
        console.log(localizationData);
        this.groupedLocations = this.groupByVersion(localizationData);
        console.log(this.groupedLocations);
    });

  }

  getPokemonColor() {
    if (this.pokemonSpecie && this.pokemonSpecie.color) {
      this.backgroundColor = this.helperService.getPokemonColor(this.pokemonSpecie.color.name);
    } else {
      this.backgroundColor = '';
    }
  }

  groupByVersion(data: LocationData[]): GroupedData {
    const groupedData: GroupedData = {};

    data.forEach(location => {
      location.version_details.forEach(versionDetail => {
        const versionName = versionDetail.version.name;

        if (!groupedData[versionName]) {
          groupedData[versionName] = [];
        }

        groupedData[versionName].push({
          location_area: location.location_area,
          encounter_details: versionDetail.encounter_details,
          max_chance: versionDetail.max_chance
        });
      });
    });

    return groupedData;
  }

}
