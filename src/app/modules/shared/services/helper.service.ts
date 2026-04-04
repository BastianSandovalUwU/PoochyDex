import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ability } from '../../../../../entities/pokemon.entity';
import { AbilityName } from '../../../../../entities/pokemon-ability.entity';
import { DetailMove } from '../../../../../entities/moves.entity';
import { TargetTypes } from '../../../../../entities/common/const.interface';
import { Pokemon, PokemonForm } from '../../../../../entities/poochydex-api/pokemon.type';
import { PokemonSpriteOption } from '../../../../../entities/poochydex-api/pokemon-sprite-option';
import { PokemonCacheService } from './pokemon-cache.service';
import { CustomPokemonCatalogService } from './custom-pokemon-catalog.service';
import { PokemonDisplayService } from './pokemon-display.service';
import { PokemonMoveAbilityService } from './pokemon-move-ability.service';

/**
 * Facade over specialized Pokémon services. Prefer injecting
 * {@link PokemonDisplayService}, {@link CustomPokemonCatalogService},
 * {@link PokemonCacheService}, or {@link PokemonMoveAbilityService} in new code.
 */
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private pokemonCache: PokemonCacheService,
    private customPokemonCatalog: CustomPokemonCatalogService,
    private pokemonDisplay: PokemonDisplayService,
    private pokemonMoveAbility: PokemonMoveAbilityService
  ) {}

  get cacheLoadingProgress$() {
    return this.pokemonCache.cacheLoadingProgress$;
  }

  get isCacheLoading$() {
    return this.pokemonCache.isCacheLoading$;
  }

  get allPokemon(): Pokemon[] {
    return this.customPokemonCatalog.allPokemon;
  }

  set allPokemon(value: Pokemon[]) {
    this.customPokemonCatalog.allPokemon = value;
  }

  get allPokemonForms(): PokemonForm[] {
    return this.customPokemonCatalog.allPokemonForms;
  }

  set allPokemonForms(value: PokemonForm[]) {
    this.customPokemonCatalog.allPokemonForms = value;
  }

  getAbilityNames(abilities: Ability[]): Observable<{ ability: Ability, names: AbilityName[] }[]> {
    return this.pokemonMoveAbility.getAbilityNames(abilities);
  }

  getTypeNameByLanguage(typeName: string, language: string): string {
    return this.pokemonDisplay.getTypeNameByLanguage(typeName, language);
  }

  getMoveNameByLanguage(move: DetailMove, language: string): Observable<{ language: string, moveName: string }> {
    return this.pokemonMoveAbility.getMoveNameByLanguage(move, language);
  }

  getMoveEffectEntryByLanguage(move: DetailMove, language: string): Observable<{ language: string, moveName: string, effect: string, shortEffect: string }> {
    return this.pokemonMoveAbility.getMoveEffectEntryByLanguage(move, language);
  }

  createAllPokemonCache(): void {
    this.pokemonCache.createAllPokemonCache();
  }

  navigateToGame(gameName: string): string {
    return this.pokemonDisplay.navigateToGame(gameName);
  }

  getTypeColorClass(typeName: string, language: string): string {
    return this.pokemonDisplay.getTypeColorClass(typeName, language);
  }

  getGenerationName(generationName: string, language: string): string {
    return this.pokemonDisplay.getGenerationName(generationName, language);
  }

  getTargetTypeName(targetType: TargetTypes, language: string): string {
    return this.pokemonDisplay.getTargetTypeName(targetType, language);
  }

  getTranslateTypeName(typeName: string, language: string): string {
    return this.pokemonDisplay.getTranslateTypeName(typeName, language);
  }

  getEggGroupName(groupName: string, language: string): string {
    return this.pokemonDisplay.getEggGroupName(groupName, language);
  }

  getGameVersionColor(gameVersion: string): string {
    return this.pokemonDisplay.getGameVersionColor(gameVersion);
  }

  getPokemonColor(color: string): string {
    return this.pokemonDisplay.getPokemonColor(color);
  }

  getGameName(gameName: string, language: string): string {
    return this.pokemonDisplay.getGameName(gameName, language);
  }

  getGameIconGame(gameName: string): string[] {
    return this.pokemonDisplay.getGameIconGame(gameName);
  }

  getPokemonSpriteImg(pokemonName: string, option: PokemonSpriteOption): Observable<string> {
    return this.customPokemonCatalog.getPokemonSpriteImg(pokemonName, option);
  }

  getPokemonArtwork(pokemonName: string): { sugimoriArt?: string; globalLinkArt?: string } {
    return this.customPokemonCatalog.getPokemonArtwork(pokemonName);
  }

  getCorrectPokemonName(pokemonName: string): string {
    return this.pokemonDisplay.getCorrectPokemonName(pokemonName);
  }

  getPokedexNumber(pokedexName: string): number {
    return this.pokemonDisplay.getPokedexNumber(pokedexName);
  }

  getGameIconForGeneration(gen: number): string[] {
    return this.pokemonDisplay.getGameIconForGeneration(gen);
  }

  getGameIconForForm(form: string): string[] {
    return this.pokemonDisplay.getGameIconForForm(form);
  }

  getGameIconNameForLanguage(typeName: string, language: string): string {
    return this.pokemonDisplay.getGameIconNameForLanguage(typeName, language);
  }

  capitalize(str: string): string {
    return this.pokemonDisplay.capitalize(str);
  }

  addZerosToNumber(number: number): string {
    return this.pokemonDisplay.addZerosToNumber(number);
  }
}
