import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon, Ability } from '../../../../../../entities/pokemon.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { Name, PokemonSpecie } from '../../../../../../entities/pokemon-specie.entity';
import { Move, ShowMove, TypeDetail, DetailMove, VersionGroupDetail, FilteredByMachine, FilteredMove, Machine, FilteredByTutor, FilteredByEgg } from '../../../../../../entities/moves.entity';
import { Subject, catchError, forkJoin, map, of, switchMap, takeUntil } from 'rxjs';
import { ExtendedMachineDetail, MachineDetail } from '../../../../../../entities/machine-move.entity';
import { AbilityName } from '../../../../../../entities/pokemon-ability.entity';
import { Chain, DetailChain, EvolutionChain } from '../../../../../../entities/evolution-chain.entity.';

@Component({
  selector: 'app-show-pokemon',
  templateUrl: './show-pokemon.component.html',
  styleUrls: ['./show-pokemon.component.scss']
})
export class ShowPokemonComponent implements OnInit {
  @ViewChild('audioPlayer', { static: false }) audioPlayer: ElementRef<HTMLAudioElement>;

  private unsubscribe$ = new Subject<void>();

  language: string = 'es';
  pokemonName: string;
  pokemonNameRomaji: Name;
  pokemonNameHirgana: Name;
  pokemon: Pokemon;
  moves: ShowMove[];
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
  filteredMovesByTutor: FilteredByTutor[] = [];
  filteredMovesByEgg: FilteredByEgg[] = [];
  movesWithTypes: { moveName: string, move: Move, types: TypeDetail[] }[] = [];
  evolutionChain: EvolutionChain;

  constructor(private pokeApiService: PokeApiService,
              private helperService: HelperService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ name }) => {
      this.pokemonName = name;
      this.getPokemonByName();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getPokemonByName() {
    this.pokeApiService.getPokemonByName(this.pokemonName).subscribe((pokeInfo) => {
      this.pokemon = pokeInfo;
      console.log(this.pokemon);
      this.moves = this.pokemon.moves;
      this.getPokemonSpecie();
      this.getPokemonMoves();
    });
  }

  getPokemonSpecie() {
    this.pokeApiService.getPokemonSpecieById(this.pokemon.species.name).subscribe((specie) => {
      this.pokemonSpecie = specie;
      this.getEvolutionChain(this.pokemonSpecie.evolution_chain.url);
      this.filterFlavorTextEntries();
    });
  }

  getEvolutionChain(url: string) {
    this.pokeApiService.getEvolutionChainByUrl(url).subscribe((evolution) => {
      this.populateEvolutionChainDetails(evolution);
    });
  }

  populateEvolutionChainDetails(evolution: EvolutionChain) {
    this.pokeApiService.getPokemonByName(evolution.chain.species.name).subscribe((species) => {
      evolution.chain.detailPokemon = species;
    });
    if (evolution.chain.evolves_to && evolution.chain.evolves_to.length > 0) {
      evolution.chain.evolves_to.forEach((evolvesTo) => {
        // Obtener detalles de la especie de Pokémon para esta etapa de la cadena de evolución
        this.pokeApiService.getPokemonByName(evolvesTo.species.name).subscribe((species) => {
          evolvesTo.detailPokemon = species;
          // Si hay evoluciones, llamar a la función recursivamente para cada una
        });
        if(evolvesTo.evolves_to && evolvesTo.evolves_to.length > 0) {
          evolvesTo.evolves_to.forEach((evolvesTo2) => {
            this.pokeApiService.getPokemonByName(evolvesTo2.species.name).subscribe((species) => {
              evolvesTo2.detailPokemon = species;
              // Si hay evoluciones, llamar a la función recursivamente para cada una
            });
          }
        )};
      });
    }
    let evolutionChain: EvolutionChain = evolution;
    this.evolutionChain = evolutionChain;
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

  goToPokemonPage(pokemonName: string) {
    this.router.navigate(['/pokedex/show-pokemon/', pokemonName]); // Reemplaza con la ruta deseada
  }

}
