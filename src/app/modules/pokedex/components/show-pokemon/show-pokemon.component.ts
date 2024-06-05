import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon, Ability } from '../../../../../../entities/pokemon.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { Name, PokemonSpecie } from '../../../../../../entities/pokemon-specie.entity';
import { Move, ShowMove, TypeDetail, DetailMove, VersionGroupDetail, FilteredByMachine, FilteredMove, Machine } from '../../../../../../entities/moves.entity';
import { forkJoin, map, of } from 'rxjs';
import { ExtendedMachineDetail, MachineDetail } from '../../../../../../entities/machine-move.entity';
import { AbilityName } from '../../../../../../entities/pokemon-ability.entity';

@Component({
  selector: 'app-show-pokemon',
  templateUrl: './show-pokemon.component.html',
  styleUrls: ['./show-pokemon.component.scss']
})
export class ShowPokemonComponent implements OnInit {

  language: string = 'es';
  pokemonName: string;
  pokemonNameRomaji: Name;
  pokemonNameHirgana: Name;
  pokemon: Pokemon;
  moves: ShowMove[];
  abilityNames: { ability: Ability, names: AbilityName[] }[];
  filteredAbilityNames: { ability: Ability, name: string }[] = [];
  pokemontypes: { language: string, typeName: string }[][];
  flavorTextEntries: { flavor_text: string, version: string }[] = [];
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
      this.getPokemonAbility();
      this.helperService.getPokemonTypes(this.pokemon.types).subscribe((types) => {
        this.pokemontypes = types;
      });
    });
  }

  getPokemonSpecie() {
    this.pokeApiService.getPokemonSpecieById(this.pokemon.species.name).subscribe((specie) => {
      this.pokemonSpecie = specie;
      this.pokemonNameRomaji = this.pokemonSpecie.names.filter(f => f.language.name === 'roomaji')[0];
      this.pokemonNameHirgana = this.pokemonSpecie.names.filter(f => f.language.name === 'ja-Hrkt')[0];
      console.log(this.pokemonSpecie);
      this.filterFlavorTextEntries();
    });
  }

  getPokemonAbility() {
    this.helperService.getAbilityNames(this.pokemon.abilities).subscribe((abilities) => {
      this.abilityNames = abilities;
      this.filterAbilityNamesByLanguage();
    });
  }

  filterAbilityNamesByLanguage(): void {
    this.filteredAbilityNames = this.abilityNames.map(abilityGroup => {
      const nameEntry = abilityGroup.names.find(n => n.language === this.language);
      return {
        ability: abilityGroup.ability,
        name: nameEntry ? nameEntry.abilityName : abilityGroup.ability.ability.name
      };
    });
  }

  filterFlavorTextEntries(): void {
    this.flavorTextEntries = this.pokemonSpecie.flavor_text_entries
      .filter(entry => entry.language.name === this.language)
      .map(entry => ({
        flavor_text: entry.flavor_text,
        version: entry.version.name
      }));
  }

  getColorClassByLanguageAndType(typeName: string, language: string): string {
      return this.helperService.getTypeColorClass(typeName, language);
  }

  getGameVersionColor(gameVersion: string): string {
      return this.helperService.getGameVersionColor(gameVersion);
  }

  getPokemonColor(color: string): string {
      return this.helperService.getPokemonColor(color);
  }

  getGenerationName(generationName: string): string {
      return this.helperService.getGenerationName(generationName, this.language);
  }

  getGameName(gameName: string): string {
      return this.helperService.getGameName(gameName, this.language);
  }

  getEggGroupName(groupName: string): string {
      return this.helperService.getEggGroupName(groupName, this.language);
  }

  calculateGenderRateMale(genderRate: number): number {
      return 100 - (genderRate * 12.5);
  }
  calculateGenderRateFemale(genderRate: number): number {
      return genderRate * 12.5;
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
    const observables = this.moves.map(move => this.pokeApiService.getMoveByUrl(move.move.url, move.move.name, move.version_group_details[0].version_group.name));

    forkJoin(observables).subscribe(details => {
      const movesArray = this.moves.map((move, index) => {
        return {
          ...move,
          detailMove: details[index]
        };
      });

      this.moves = movesArray;

      const typeNamesObservables = this.moves.map(move =>
        move.detailMove.type.name !== 'unknown'
          ? this.helperService.getMoveType(move.detailMove.type.name)
          : of([{ language: this.language, typeName: 'No Encontrado' }])
      );

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
    this.filterMovesByLevel();
    this.filterMovesByMachine();
    this.filterMovesByTutor();
    this.filterMovesByEgg();
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
        const machineDetails: any[] = moveWithTypes.move.version_group_details.filter((machine) =>
          machine.move_learn_method.name === 'machine'
        );

        if (machineDetails.length > 0) {
          const matchingMachineDetail = machineDetails.find(detail =>
            detail.version_group.name === this.machineSelectedVersionGroup
          );

          if (matchingMachineDetail) {
              let moveDetails = undefined;
              this.pokeApiService.getMachineMoveByUrl(moveWithTypes.move.move.url).subscribe(details => {
                moveDetails = details;
              });
            return {
              ...moveWithTypes,
              machineDetail: matchingMachineDetail
            };
          }
        }

        return null;
      })
      .filter(moveWithDetails => moveWithDetails !== null) as FilteredByMachine[];

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
  }
}
