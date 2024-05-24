import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon } from '../../../../../../entities/pokemon.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { PokemonSpecie } from '../../../../../../entities/pokemon-specie.entity';
import { ShowMove, TypeDetail } from '../../../../../../entities/moves.entity';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-show-pokemon',
  templateUrl: './show-pokemon.component.html',
  styleUrls: ['./show-pokemon.component.scss']
})
export class ShowPokemonComponent implements OnInit {

  language: string = 'es';
  pokemonName: string;
  pokemon: Pokemon;
  moves: ShowMove[];
  pokemontypes: { language: string, typeName: string }[][];
  pokemonSpecie: PokemonSpecie;
  versionGroups: string[] = [];
  selectedVersionGroup: string = '';
  filteredMoves: any[] = [];
  movesWithTypes: { move: any, types: TypeDetail[] }[] = [];

  constructor(private pokeApiService: PokeApiService,
              private helperService: HelperService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ name }) => {
      this.pokemonName = name;
      this.getPokemonByName();
    });
  }

  getPokemonByName() {
    this.pokeApiService.getPokemonByName(this.pokemonName).subscribe((pokeInfo) => {
      console.log(pokeInfo);
      this.pokemon = pokeInfo;
      this.moves = this.pokemon.moves;
      this.getPokemonMoves();
      this.getPokemonSpecie();
      this.helperService.getPokemonTypes(this.pokemon.types).subscribe((types) => {
        this.pokemontypes = types;
      });
    });
  }

  getPokemonSpecie() {
    this.pokeApiService.getPokemonSpecieById(this.pokemon.id).subscribe((specie) => {
      console.log(specie);
      this.pokemonSpecie = specie;
    });
  }

  getColorClassByLanguageAndType(typeName: string, language: string): string {
      return this.helperService.getTypeColorClass(typeName, language);
  }
  getGenerationName(generationName: string): string {
      return this.helperService.getGenerationName(generationName, this.language);
  }
  getEggGroupName(groupName: string): string {
      return this.helperService.getEggGroupName(groupName);
  }

  playAudio(idAudio: string) {
    var audioPlayer = document.getElementById(idAudio) as HTMLAudioElement;
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }

  onVersionGroupChange(event: Event): void {
    const selectedGroup = (event.target as HTMLSelectElement).value;
    this.selectedVersionGroup = selectedGroup;
    this.filterMoves();
  }

  getPokemonMoves(): void {
    const observables = this.moves.map(move => this.pokeApiService.getMoveById(move.move.name));

    forkJoin(observables).subscribe(details => {
      const movesArray = this.moves.map((move, index) => {
        return {
          ...move,
          detailMove: details[index]
        };
      });

      this.moves = movesArray;

      // Obtener los nombres de los tipos para cada movimiento
      const typeNamesObservables = this.moves.map(move => this.helperService.getMoveType(move.detailMove.type.name));
      forkJoin(typeNamesObservables).subscribe(typeNamesArray => {
        this.movesWithTypes = typeNamesArray.map((typeNames, index) => {
          // Filtrar los tipos por idioma
          const filteredTypeNames = typeNames.filter(f => f.language === this.language);

          // Filtrar los nombres de los movimientos por idioma
          const moveName = this.moves[index].detailMove.names.find(name => name.language.name === this.language)?.name || this.moves[index].move.name;

          return {
            move: this.moves[index], // El movimiento actual
            types: filteredTypeNames, // Los nombres de los tipos con su información de idioma
            moveName // El nombre del movimiento en el idioma seleccionado
          };
        });

        console.log(this.movesWithTypes);

        this.extractVersionGroups();
        this.filterMoves();
      });
    });
  }

  extractVersionGroups(): void {
    const versionGroupsSet = new Set<string>();
    this.movesWithTypes.forEach(moveWithTypes => {
      moveWithTypes.move.version_group_details.forEach(detail => {
        versionGroupsSet.add(detail.version_group.name);
      });
    });
    this.versionGroups = Array.from(versionGroupsSet).sort();
    if (this.versionGroups.includes('scarlet-violet')) {
      this.selectedVersionGroup = 'scarlet-violet'; // Selecciona "scarlet-violet" si está presente
    } else if (this.versionGroups.length > 0) {
      this.selectedVersionGroup = this.versionGroups[this.versionGroups.length - 1]; // Selecciona la última versión si "scarlet-violet" no está presente
    }
  }

  filterMoves(): void {
    const filteredMoves = this.movesWithTypes
      .map(moveWithTypes => ({
        ...moveWithTypes,
        move: {
          ...moveWithTypes.move,
          version_group_details: moveWithTypes.move.version_group_details.filter(detail =>
            detail.move_learn_method.name === 'level-up' &&
            detail.version_group.name === this.selectedVersionGroup
          )
        }
      }))
      .filter(moveWithTypes => moveWithTypes.move.version_group_details.length > 0);

    filteredMoves.forEach(moveWithTypes => {
      moveWithTypes.move.version_group_details.sort((a, b) => a.level_learned_at - b.level_learned_at);
    });

    // Ordenar los movimientos filtrados de menor a mayor nivel aprendido
    filteredMoves.sort((move1, move2) => {
      const minLevel1 = move1.move.version_group_details[0].level_learned_at;
      const minLevel2 = move2.move.version_group_details[0].level_learned_at;
      return minLevel1 - minLevel2;
    });

    this.filteredMoves = filteredMoves;
  }

}
