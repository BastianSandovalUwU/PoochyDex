import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon } from '../../../../../../entities/pokemon.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { PokemonSpecie } from '../../../../../../entities/pokemon-specie.entity';
import { Move, ShowMove, TypeDetail, DetailMove, VersionGroupDetail, FilteredByMachine, FilteredMove } from '../../../../../../entities/moves.entity';
import { forkJoin } from 'rxjs';
import { ExtendedMachineDetail, MachineDetail } from '../../../../../../entities/machine-move.entity';

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
  levelUpSelectedVersionGroup: string = '';
  tutorSelectedVersionGroup: string = '';
  machineSelectedVersionGroup: string = '';
  eggSelectedVersionGroup: string = '';
  filteredMoves: FilteredMove[] = [];
  filteredMovesByMachine: FilteredByMachine[] = [];
  filteredMovesByTutor: FilteredMove[] = [];
  filteredMovesByEgg: FilteredMove[] = [];
  movesWithTypes: { moveName: string, move: Move, types: TypeDetail[] }[] = [];

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
      this.pokemon = pokeInfo;
      console.log(this.pokemon);
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

  levelUpChangeGame(event: Event): void {
    const selectedGroup = (event.target as HTMLSelectElement).value;
    this.levelUpSelectedVersionGroup = selectedGroup;
    this.filterMovesByLevel();
  }

  machineChangeGame(event: Event): void {
    const selectedGroup = (event.target as HTMLSelectElement).value;
    this.machineSelectedVersionGroup = selectedGroup;
    this.filterMovesByMachine();
  }

  tutorChangeGame(event: Event): void {
    const selectedGroup = (event.target as HTMLSelectElement).value;
    this.tutorSelectedVersionGroup = selectedGroup;
    this.filterMovesByTutor();
  }
  eggChangeGame(event: Event): void {
    const selectedGroup = (event.target as HTMLSelectElement).value;
    this.eggSelectedVersionGroup = selectedGroup;
    this.filterMovesByEgg();
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

      const typeNamesObservables = this.moves.map(move => this.helperService.getMoveType(move.detailMove.type.name));
      forkJoin(typeNamesObservables).subscribe(typeNamesArray => {
        this.movesWithTypes = typeNamesArray.map((typeNames, index) => {
          const filteredTypeNames = typeNames.filter(f => f.language === this.language);

          const moveName = this.moves[index].detailMove.names.find(name => name.language.name === this.language)?.name || this.moves[index].move.name;

          return {
            move: this.moves[index],
            types: filteredTypeNames,
            moveName
          };
        });

        this.extractVersionGroups();
        this.filterMovesByLevel();
        this.filterMovesByMachine();
        this.filterMovesByTutor();
        this.filterMovesByEgg();
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
      this.machineSelectedVersionGroup = 'scarlet-violet';
      this.levelUpSelectedVersionGroup = 'scarlet-violet';
      this.tutorSelectedVersionGroup = 'scarlet-violet';
      this.eggSelectedVersionGroup = 'scarlet-violet';
    } else if (this.versionGroups.length > 0) {
      this.machineSelectedVersionGroup = this.versionGroups[this.versionGroups.length - 1];
      this.levelUpSelectedVersionGroup = this.versionGroups[this.versionGroups.length - 1];
      this.tutorSelectedVersionGroup = this.versionGroups[this.versionGroups.length - 1];
      this.eggSelectedVersionGroup = this.versionGroups[this.versionGroups.length - 1];
    }
  }

  filterMovesByLevel(): void {
    const filteredMoves = this.movesWithTypes
      .map(moveWithTypes => ({
        ...moveWithTypes,
        move: {
          ...moveWithTypes.move,
          version_group_details: moveWithTypes.move.version_group_details.filter(detail =>
            detail.move_learn_method.name === 'level-up' &&
            detail.version_group.name === this.levelUpSelectedVersionGroup
          )
        }
      }))
      .filter(moveWithTypes => moveWithTypes.move.version_group_details.length > 0);

    filteredMoves.forEach(moveWithTypes => {
      moveWithTypes.move.version_group_details.sort((a, b) => a.level_learned_at - b.level_learned_at);
    });

    filteredMoves.sort((move1, move2) => {
      const minLevel1 = move1.move.version_group_details[0].level_learned_at;
      const minLevel2 = move2.move.version_group_details[0].level_learned_at;
      return minLevel1 - minLevel2;
    });

    this.filteredMoves = filteredMoves;
  }

  filterMovesByMachine(): void {
    const filteredMoves: FilteredByMachine[] = this.movesWithTypes
      .map(moveWithTypes => {
        const machineDetail: ExtendedMachineDetail | undefined = moveWithTypes.move.detailMove.machines.find((detail: MachineDetail) =>
          detail.version_group.name === this.machineSelectedVersionGroup
        );

        if (machineDetail) {
          return {
            ...moveWithTypes,
            machineDetail: machineDetail
          };
        }

        return null;
      })
      .filter(moveWithDetails => moveWithDetails !== null) as FilteredByMachine[];

    filteredMoves.forEach(move => {
      this.pokeApiService.getMachineMoveByUrl(move.machineDetail.machine.url).subscribe(details => {
        move.machineDetail.moveDetails = details;
      });
    });

    this.filteredMovesByMachine = filteredMoves;
  }

  filterMovesByTutor(): void {
    const filteredMoves = this.movesWithTypes
      .map(moveWithTypes => ({
        ...moveWithTypes,
        move: {
          ...moveWithTypes.move,
          version_group_details: moveWithTypes.move.version_group_details.filter(detail =>
            detail.move_learn_method.name === 'tutor' &&
            detail.version_group.name === this.tutorSelectedVersionGroup
          )
        }
      }))
      .filter(moveWithTypes => moveWithTypes.move.version_group_details.length > 0);

    this.filteredMovesByTutor = filteredMoves;

  }
  filterMovesByEgg(): void {
    const filteredMoves = this.movesWithTypes
      .map(moveWithTypes => ({
        ...moveWithTypes,
        move: {
          ...moveWithTypes.move,
          version_group_details: moveWithTypes.move.version_group_details.filter(detail =>
            detail.move_learn_method.name === 'egg' &&
            detail.version_group.name === this.eggSelectedVersionGroup
          )
        }
      }))
      .filter(moveWithTypes => moveWithTypes.move.version_group_details.length > 0);

    this.filteredMovesByEgg = filteredMoves;
    console.log(this.filteredMovesByEgg);
  }
}
