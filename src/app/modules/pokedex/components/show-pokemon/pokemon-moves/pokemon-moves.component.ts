import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../../../../../../entities/pokemon.entity';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { FilteredByEgg, FilteredByMachine, FilteredByTutor, FilteredMove, Move, ShowMove, TypeDetail } from '../../../../../../../entities/moves.entity';
import { Subject, catchError, forkJoin, of, takeUntil } from 'rxjs';
import { ExtendedMachineDetail } from '../../../../../../../entities/machine-move.entity';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ErrorMessageService } from 'app/services/error-message.service';

@Component({
  selector: 'app-pokemon-moves',
  templateUrl: './pokemon-moves.component.html',
  styleUrls: ['./pokemon-moves.component.scss'],
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
export class PokemonMovesComponent implements OnInit, OnDestroy, OnChanges {
  @Input() language: string = 'es';
  @Input() pokemon: Pokemon;
  @Input() pokemonSpecie: PokemonSpecie;
  @Input() movesWithTypes: { moveName: string, move: Move, types: TypeDetail[] }[] = [];
  private unsubscribe$ = new Subject<void>();

  versionGroups: string[] = [];
  levelUpSelectedVersionGroup: string = '';
  tutorSelectedVersionGroup: string = '';
  machineSelectedVersionGroup: string = '';
  eggSelectedVersionGroup: string = '';
  filteredMoves: FilteredMove[] = [];
  filteredMovesByMachine: FilteredByMachine[] = [];
  filteredMovesByTutor: FilteredByTutor[] = [];
  filteredMovesByEgg: FilteredByEgg[] = [];
  backgroundColor: string = '';
  selectedTabIndex = 0;
  selectedTabIndexMT = 0;
  selectedTabIndexTutor = 0;
  selectedTabIndexTutorEgg = 0;
  filtersVisibleLevel = true;
  filtersVisibleMt = true;
  filtersVisibleTutor = true;
  filtersVisibleEgg = true;

  constructor(private pokeApiService: PokeApiService,
              private helperService: HelperService,
              private errorMessageService: ErrorMessageService) { }

  ngOnInit() {
    this.getPokemonColor();
    this.processMoves();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movesWithTypes'] && !changes['movesWithTypes'].firstChange) {
      this.processMoves();
    }
    if (changes['pokemonSpecie'] && !changes['pokemonSpecie'].firstChange) {
      this.getPokemonColor();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  toggleFilters(option: string) {
    switch (option) {
      case "lvl":
        this.filtersVisibleLevel = !this.filtersVisibleLevel;
        break;
      case "mt":
        this.filtersVisibleMt = !this.filtersVisibleMt;
        break;
      case "tutor":
        this.filtersVisibleTutor = !this.filtersVisibleTutor;
        break;
      case "egg":
        this.filtersVisibleEgg = !this.filtersVisibleEgg;
        break;
      default:
        break;
    }
  }

  processMoves(): void {
    if (this.movesWithTypes.length > 0) {
      this.extractVersionGroups();
    }
  }

  levelUpChangeGame(event: MatTabChangeEvent): void {
    const selectedGroup = this.versionGroups[event.index];
    this.levelUpSelectedVersionGroup = selectedGroup;
    this.filterMovesByLevel();
  }

  machineChangeGame(event: MatTabChangeEvent): void {
    const selectedGroup = this.versionGroups[event.index];
    this.machineSelectedVersionGroup = selectedGroup;
    this.filterMovesByMachine();
  }

  tutorChangeGame(event: MatTabChangeEvent): void {
    const selectedGroup = this.versionGroups[event.index];
    this.tutorSelectedVersionGroup = selectedGroup;
    this.filterMovesByTutor();
  }

  eggChangeGame(event: MatTabChangeEvent): void {
    const selectedGroup = this.versionGroups[event.index];
    this.eggSelectedVersionGroup = selectedGroup;
    this.filterMovesByEgg();
  }

  extractVersionGroups(): void {
    const desiredOrder = [
      "scarlet-violet",
      "brilliant-diamond-and-shining-pearl",
      "sword-shield",
      "lets-go-pikachu-lets-go-eevee",
      "ultra-sun-ultra-moon",
      "sun-moon",
      "omega-ruby-alpha-sapphire",
      "x-y",
      "black-2-white-2",
      "black-white",
      "heartgold-soulsilver",
      "platinum",
      "diamond-pearl",
      "emerald",
      "firered-leafgreen",
      "ruby-sapphire",
      "crystal",
      "gold-silver",
      "yellow",
      "red-blue",
    ];

    const versionGroupsSet = new Set<string>();

    this.movesWithTypes.forEach(moveWithTypes => {
      moveWithTypes.move.version_group_details.forEach(detail => {
        versionGroupsSet.add(detail.version_group.name);
      });
    });

    this.versionGroups = Array.from(versionGroupsSet);
    this.versionGroups = desiredOrder.filter(version => this.versionGroups.includes(version));
    this.versionGroups.sort((a, b) => desiredOrder.indexOf(a) - desiredOrder.indexOf(b));

    const defaultVersion = 'scarlet-violet';

    if (this.versionGroups.includes(defaultVersion)) {
      this.machineSelectedVersionGroup = defaultVersion;
      this.levelUpSelectedVersionGroup = defaultVersion;
      this.tutorSelectedVersionGroup = defaultVersion;
      this.eggSelectedVersionGroup = defaultVersion;
    } else if (this.versionGroups.length > 0) {
      const lastVersion = this.versionGroups[this.versionGroups.length - 1];
      this.machineSelectedVersionGroup = lastVersion;
      this.levelUpSelectedVersionGroup = lastVersion;
      this.tutorSelectedVersionGroup = lastVersion;
      this.eggSelectedVersionGroup = lastVersion;
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
    const machineMoves = this.movesWithTypes
      .map(moveWithTypes => {
        const machineDetails: ExtendedMachineDetail[] = moveWithTypes.move.detailMove.machines.filter((machine) =>
          machine.version_group.name === this.machineSelectedVersionGroup
        ).map((machine): ExtendedMachineDetail => ({
          ...machine,
          move_learn_method: { name: 'machine', url: '' },
          version_group: { name: this.machineSelectedVersionGroup, url: '' },
          machine: { url: machine.machine.url },
          level_learned_at: 0
        }));

        if (machineDetails.length > 0) {
          const matchingMachineDetail = machineDetails[0];
          return {
            ...moveWithTypes,
            machineDetail: matchingMachineDetail
          };
        }

        return null;
      })
      .filter(moveWithDetails => moveWithDetails !== null) as FilteredByMachine[];

    const machineDetailObservables = machineMoves.map(move =>
      this.pokeApiService.getMachineMoveByUrl(move.machineDetail.machine.url).pipe(
        catchError(error => {
          return of(null);
        })
      )
    );

    forkJoin(machineDetailObservables)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (machineDetails) => {
          this.filteredMovesByMachine = machineMoves.map((move, index) => {
            if (machineDetails[index]) {
              move.machineDetail.moveDetails = machineDetails[index];
          }
          return move;
        });
      },
      error: (error) => {
        const errorMessage = this.language === 'es' ? 'Error al cargar los movimientos' : 'Error loading moves';
        this.errorMessageService.showError(errorMessage, error.message);
      }
    });
  }

  filterMovesByTutor(): void {
    const tutorMoves = this.movesWithTypes
      .map(moveWithTypes => {
        const tutorDetails = moveWithTypes.move.version_group_details.filter(detail =>
          detail.move_learn_method.name === 'tutor' &&
          detail.version_group.name === this.tutorSelectedVersionGroup
        );

        if (tutorDetails) {
          return {
            ...moveWithTypes,
            move: {
              ...moveWithTypes.move,
              version_group_details: tutorDetails
            }
          };
        }

        return null;
      })
      .filter(moveWithDetails => moveWithDetails !== null);

    this.filteredMovesByTutor = tutorMoves as FilteredByTutor[];
  }

  filterMovesByEgg(): void {
    const filteredMoves = this.movesWithTypes
      .map(moveWithTypes => {
        const eggDetails = moveWithTypes.move.version_group_details.filter(detail =>
          detail.move_learn_method.name === 'egg' &&
          detail.version_group.name === this.eggSelectedVersionGroup
        );

        if (eggDetails.length > 0) {
          return {
            ...moveWithTypes,
            move: {
              ...moveWithTypes.move,
              version_group_details: eggDetails
            }
          };
        }

        return null;
      })
      .filter(moveWithDetails => moveWithDetails !== null);

    this.filteredMovesByEgg = filteredMoves as FilteredByEgg[];
  }

  getGameName(gameName: string): string {
    return this.helperService.getGameName(gameName, this.language);
  }

  getGameIconGame(gameName: string): string[] {
    return this.helperService.getGameIconGame(gameName);
  }

  getColorClassByLanguageAndType(typeName: string, language: string): string {
    return this.helperService.getTypeColorClass(typeName, language);
  }

  getGameVersionColor(gameVersion: string): string {
    return this.helperService.getGameVersionColor(gameVersion);
  }

  getPokemonColor() {
    if (this.pokemonSpecie && this.pokemonSpecie.color) {
      this.backgroundColor = this.helperService.getPokemonColor(this.pokemonSpecie.color.name);
    } else {
      this.backgroundColor = '';
    }
  }

  getLevelLearnedAt(pokeMove): number {
    const detail = pokeMove.move.version_group_details.find(
      detail => detail.version_group.name === this.levelUpSelectedVersionGroup
    );
    return detail ? detail.level_learned_at : 0;
  }

  getVersionGroupName(pokeMove): string {
    const detail = pokeMove.move.version_group_details.find(
      detail => detail.version_group.name === this.levelUpSelectedVersionGroup
    );
    return detail ? detail.version_group.name : '';
  }

  getTypeName(pokeMove): string {
    return pokeMove.types[0]?.typeName || '';
  }

}
