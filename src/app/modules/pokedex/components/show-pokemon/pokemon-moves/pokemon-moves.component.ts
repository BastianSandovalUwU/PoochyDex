import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../../../../../../entities/pokemon.entity';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { FilteredByEgg, FilteredByMachine, FilteredByTutor, FilteredMove, Move, ShowMove, TypeDetail } from '../../../../../../../entities/moves.entity';
import { Subject, catchError, forkJoin, of, takeUntil } from 'rxjs';
import { ExtendedMachineDetail } from '../../../../../../../entities/machine-move.entity';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-pokemon-moves',
  templateUrl: './pokemon-moves.component.html',
  styleUrls: ['./pokemon-moves.component.scss']
})
export class PokemonMovesComponent implements OnInit, OnDestroy, OnChanges {
  @Input() language: string = 'es';
  @Input() pokemon: Pokemon;
  @Input() pokemonSpecie: PokemonSpecie;
  private unsubscribe$ = new Subject<void>();

  moves: ShowMove[];
  movesWithTypes: { moveName: string, move: Move, types: TypeDetail[] }[] = [];
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
  selectedTabIndex2 = 0;

  constructor(private pokeApiService: PokeApiService,
              private helperService: HelperService,) { }

  ngOnInit() {
    this.getPokemonColor();
    this.getPokemonMoves();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.getPokemonMoves();
      this.getPokemonColor();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getPokemonMoves(): void {
    this.moves = this.pokemon.moves;
    const observables = this.moves.map(move =>
      this.pokeApiService.getMoveByUrl(move.move.url, move.move.name, move.version_group_details[0].version_group.name)
    );

    forkJoin(observables).subscribe(details => {
      const movesArray = this.moves.map((move, index) => ({
        ...move,
        detailMove: details[index]
      }));

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

        // Si hay máquinas para el juego seleccionado, proceder
        if (machineDetails.length > 0) {
          // Seleccionar solo la primera máquina que coincida
          const matchingMachineDetail = machineDetails[0];

          // Retornar el movimiento con el detalle de la máquina correspondiente
          return {
            ...moveWithTypes,
            machineDetail: matchingMachineDetail
          };
        }

        return null;
      })
      .filter(moveWithDetails => moveWithDetails !== null) as FilteredByMachine[];

    // Realizar las llamadas a la API para obtener los detalles de las máquinas
    const machineDetailObservables = machineMoves.map(move =>
      this.pokeApiService.getMachineMoveByUrl(move.machineDetail.machine.url).pipe(
        catchError(error => {
          return of(null); // Devuelve null en caso de error
        })
      )
    );

    // Realizar todas las llamadas de manera concurrente
    forkJoin(machineDetailObservables)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(machineDetails => {
        // Asignar los detalles de las máquinas a cada movimiento
        this.filteredMovesByMachine = machineMoves.map((move, index) => {
          if (machineDetails[index]) {
            move.machineDetail.moveDetails = machineDetails[index];
          }
          return move;
        });
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

    // Assuming you don't need additional API calls for tutor details as with machines
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
          // Crear una copia del objeto moveWithTypes y asignar los eggDetails
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
      this.backgroundColor = ''; // Asigna una cadena vacía si no hay color
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
