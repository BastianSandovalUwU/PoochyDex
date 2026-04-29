import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { PokemonAbility, FlavorTextEntry } from '../../../../../../entities/pokemon-ability.entity';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { ErrorMessageService } from 'app/services/error-message.service';
import { LoadingService } from 'app/modules/shared/services/loading.service';
import { PoochyDexApiService } from 'app/modules/poochyDexApi/services/poochyDexApi.service';
import { Pokemon } from '../../../../../../entities/poochydex-api/pokemon.type';
import { detailFadeInAnimations } from 'app/modules/shared/animations/detail-fade-in.animation';

const FALLBACK_SPRITE = 'https://i.imgur.com/uKx7iOF.png';

@Component({
  selector: 'app-show-ability',
  templateUrl: './show-ability.component.html',
  styleUrls: ['./show-ability.component.scss'],
  animations: detailFadeInAnimations
})
export class ShowAbilityComponent implements OnInit {
  language: string = 'es';
  ability: PokemonAbility;
  abilityDescription: FlavorTextEntry[];
  flavorTextsByGame: Map<string, FlavorTextEntry[]> = new Map();
  pokemonDataMap: Map<string, Pokemon> = new Map();
  abilityPokemonNames: string[] = [];

  constructor(
    private pokeApiService: PokeApiService,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
    private helperService: HelperService,
    private errorMessageService: ErrorMessageService,
    private loadingService: LoadingService,
    private poochyDexApiService: PoochyDexApiService
  ) {}

  ngOnInit() {
    this.getLanguage();
    this.activatedRoute.params.subscribe(({ ability }) => {
      if (ability) {
        this.getAbilityWithPokemonDetails(ability);
      } else {
        const errorMessage = this.language === 'es' ? 'Error al cargar la habilidad' : 'Error loading ability';
        this.errorMessageService.showError(errorMessage, 'Invalid route parameter');
      }
    });
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  getAbilitDescriptionLanguage(): void {
    this.abilityDescription = this.ability.flavor_text_entries.filter(f => f.language.name === this.language);
  }

  getAbilityWithPokemonDetails(abilityName: string) {
    this.loadingService.show();
    this.pokeApiService.getAbilityById(abilityName).subscribe({
      next: (ability) => {
        this.ability = ability;
        this.abilityPokemonNames = ability.pokemon.map(p => p.pokemon.name);
        this.getAbilitDescriptionLanguage();
        this.processFlavorTexts();
        this.loadAllPokemon();
      },
      error: (error) => {
        const errorMessage = this.language === 'es' ? 'Error al cargar la habilidad' : 'Error loading ability';
        this.errorMessageService.showError(errorMessage, error.message);
        this.loadingService.hide();
      }
    });
  }

  loadAllPokemon(): void {
    this.poochyDexApiService.getAllPokemon().subscribe({
      next: (response) => {
        this.pokemonDataMap.clear();
        response.data.forEach(pokemon => {
          if (this.abilityPokemonNames.includes(pokemon.name)) {
            this.pokemonDataMap.set(pokemon.name.toLowerCase(), pokemon);
          }
        });
        this.loadingService.hide();
      },
      error: (error) => {
        const errorMessage = this.language === 'es' ? 'Error al cargar los Pokémon' : 'Error loading Pokemon';
        this.errorMessageService.showError(errorMessage, error.message);
        this.loadingService.hide();
      }
    });
  }

  getPokemonSprite(pokemonName: string): string {
    const correctedName = this.helperService.getCorrectPokemonName(pokemonName);
    const pokemon = this.pokemonDataMap.get(correctedName.toLowerCase());
    return pokemon?.sprites?.iconUrl || FALLBACK_SPRITE;
  }


  processFlavorTexts(): void {
    if (!this.ability?.flavor_text_entries) {
      return;
    }
    const targetLanguage = this.language === 'es' ? 'es' : 'en';
    const filteredEntries = this.ability.flavor_text_entries.filter(
      entry => entry.language?.name === targetLanguage
    );
    this.flavorTextsByGame.clear();
    filteredEntries.forEach(entry => {
      const versionGroupName = entry.version_group?.name ?? 'unknown';
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
    return result.sort((a, b) => b.version.localeCompare(a.version));
  }

  getFlavorText(entry: FlavorTextEntry): string {
    return (entry.flavor_text || '').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  }

  getGameVersionColor(gameVersion: string): string {
    return this.helperService.getGameVersionColor(gameVersion);
  }

  getGameIconGame(gameName: string): string[] {
    return this.helperService.getGameIconGame(gameName);
  }

  getAbilityName(): string {
    const nameEntry = this.ability?.names?.find(n => n.language?.name === this.language);
    return nameEntry?.name ?? this.ability?.name ?? '';
  }

  getGenerationName(generationName: string): string {
    return this.helperService.getGenerationName(generationName, this.language);
  }
}
