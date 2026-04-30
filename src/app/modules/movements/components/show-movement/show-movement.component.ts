import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { DetailMove, FlavorTextEntry } from '../../../../../../entities/moves.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { Pokemon } from '../../../../../../entities/poochydex-api/pokemon.type';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { ErrorMessageService } from 'app/services/error-message.service';
import { PoochyDexApiService } from 'app/modules/poochyDexApi/services/poochy-dex-api.service';
import { LoadingService } from 'app/modules/shared/services/loading.service';
import { detailFadeInAnimations } from 'app/modules/shared/animations/detail-fade-in.animation';

@Component({
  selector: 'app-show-movement',
  templateUrl: './show-movement.component.html',
  styleUrls: ['./show-movement.component.scss'],
  animations: detailFadeInAnimations
})
export class ShowMovementComponent implements OnInit {

  language: string;
  backgroundColor: string = '';
  pokemonMove: string;
  moveName: string = '';
  move: DetailMove;
  pokemon: Pokemon[] = [];
  allPokemon: Pokemon[] = [];
  pokemonDataMap: Map<string, Pokemon> = new Map();
  moveEffectEntry: any;
  flavorTextsByGame: Map<string, FlavorTextEntry[]> = new Map();
  moveType: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private languageService: LanguageService,
              private pokeApiService: PokeApiService,
              private helperService: HelperService,
              private loadingService: LoadingService,
              private errorMessageService: ErrorMessageService,
              private poochyDexApiService: PoochyDexApiService) {
    this.activatedRoute.params.subscribe(({ id }) => this.pokemonMove = id);
  }

  ngOnInit(): void {
  this.getLanguage();
  this.getMove();
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  getMove() {
    this.loadingService.show();
    this.pokeApiService.getMoveByName(this.pokemonMove, 'scarlet-violet').subscribe({
      next: (movement) => {
        this.moveType = this.helperService.getTypeNameByLanguage(movement.type.name, this.language);
        this.move = movement;
        this.moveName = this.getMoveNameByLanguage();
        this.moveEffectEntry = this.getMoveEffectEntryByLanguage();
        this.processFlavorTexts();
        this.loadingService.hide();
        this.loadAllPokemon();
      },
      error: (error) => {
        const errorMessage = this.language === 'es' ? 'Error al cargar el movimiento' : 'Error loading movement';
        this.errorMessageService.showError(errorMessage, error.message);
        this.loadingService.hide();
      }
    });
  }

  processFlavorTexts() {
    if (!this.move || !this.move.flavor_text_entries) {
      return;
    }

    // Filtrar por idioma (es o en)
    const targetLanguage = this.language === 'es' ? 'es' : 'en';
    const filteredEntries = this.move.flavor_text_entries.filter(
      entry => entry.language.name === targetLanguage
    );

    // Agrupar por version_group
    this.flavorTextsByGame.clear();
    filteredEntries.forEach(entry => {
      const versionGroupName = entry.version_group.name;
      if (!this.flavorTextsByGame.has(versionGroupName)) {
        this.flavorTextsByGame.set(versionGroupName, []);
      }
      this.flavorTextsByGame.get(versionGroupName)!.push(entry);
    });
  }

  getFlavorTextsByGame(): Array<{ flavor_text: string; version: string }> {
    const result: Array<{ flavor_text: string; version: string }> = [];

    this.flavorTextsByGame.forEach((entries, versionGroup) => {
      entries.forEach(entry => {
        result.push({
          flavor_text: this.getFlavorText(entry),
          version: versionGroup
        });
      });
    });

    // Sort by version_group (newest first)
    return result.sort((a, b) => {
      return b.version.localeCompare(a.version);
    });
  }

  getGameVersionColor(gameVersion: string): string {
    return this.helperService.getGameVersionColor(gameVersion);
  }

  getGameIconGame(gameName: string): string[] {
    return this.helperService.getGameIconGame(gameName);
  }

  getFlavorText(entry: FlavorTextEntry): string {
    // Normalize flavor text (newlines / extra spaces)
    return entry.flavor_text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  }

  loadAllPokemon() {
    this.loadingService.show();
    this.poochyDexApiService.getAllPokemon().subscribe({
      next: (response) => {
        this.allPokemon = response.data;
        // Name -> Pokémon map for lookups
        this.allPokemon.forEach(pokemon => {
          this.pokemonDataMap.set(pokemon.name.toLowerCase(), pokemon);
        });
        // Resolve learners from custom API data
        this.getPokemonDetails();
      },
      error: (error) => {
        const errorMessage = this.language === 'es' ? 'Error al cargar los Pokémon' : 'Error loading Pokemon';
        this.errorMessageService.showError(errorMessage, error.message);
        this.loadingService.hide();
      }
    });
  }

  getGenerationName(generationName: string): string {
    return this.helperService.getGenerationName(generationName, this.language);
  }
  getTypeColorClass(typeName: string): string {
    return this.helperService.getTypeColorClass(typeName, this.language);
  }
  getMoveEffectEntryByLanguage() {
    let effectEntry = null;
    this.helperService.getMoveEffectEntryByLanguage(this.move, this.language).subscribe((effect) => {
      effectEntry = effect
    });
    return effectEntry;
  }

  getPokemonDetails() {
    this.loadingService.show();
    if (!this.move || !this.move.learned_by_pokemon || this.pokemonDataMap.size === 0) {
      return;
    }

    const pokemonList: Pokemon[] = [];

    for (const learnedByPokemon of this.move.learned_by_pokemon) {
      // Canonical name via helper (aliases / forms)
      const correctedName = this.helperService.getCorrectPokemonName(learnedByPokemon.name);
      const pokemonData = this.pokemonDataMap.get(correctedName.toLowerCase());

      if (pokemonData) {
        pokemonList.push(pokemonData);
      }
    }

    this.pokemon = pokemonList;
    this.loadingService.hide();
  }

  getPokemonSprite(pokemonName: string): string {
    const pokemon = this.pokemonDataMap.get(pokemonName.toLowerCase());
    return pokemon?.sprites?.iconUrl || 'https://i.imgur.com/uKx7iOF.png';
  }

  getColorClassByLanguageAndType(typeName: string): string {
    return this.helperService.getTypeColorClass(typeName, this.language);
  }
  getTargetTypeName(targetName: string): string {
    return this.helperService.getTargetTypeName(targetName, this.language);
  }
  getTranslateTypeName(targetName: string): string {
    return this.helperService.getTranslateTypeName(targetName, this.language);
  }

  getMoveNameByLanguage(): string {
    let name;
    this.helperService.getMoveNameByLanguage(this.move, this.language).subscribe((moveName) => {
      name = moveName
      });
    return name.moveName;
  }

}
