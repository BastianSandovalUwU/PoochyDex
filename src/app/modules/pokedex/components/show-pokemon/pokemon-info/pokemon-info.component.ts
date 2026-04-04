import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Ability, Pokemon } from '../../../../../../../entities/pokemon.entity';
import { Name, PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { AbilityName } from '../../../../../../../entities/pokemon-ability.entity';
import { PokemonSpriteOption } from '../../../../../../../entities/poochydex-api/pokemon-sprite-option';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss']
})
export class PokemonInfoComponent implements OnInit, OnChanges {
  /** Exposed for template bindings (Angular templates cannot reference imported enums). */
  readonly PokemonSpriteOption = PokemonSpriteOption;

  @Input() language: string;
  @Input() pokemon: Pokemon;
  @Input() pokemonSpecie: PokemonSpecie;
  @Input() pokemonSprite: string;
  @Input() pokemonSpriteShiny: string;

  backgroundColor: string = '';
  pokemontypes: { language: string, typeName: string }[] = [];
  filteredAbilityNames: { ability: Ability, name: string }[] = [];
  abilityNames: { ability: Ability, names: AbilityName[] }[];
  showShiny: boolean = false;
  pokemonNameRomaji: Name;
  pokemonNameHirgana: Name;

  // Selector de imagen / arte
  selectedImageType: PokemonSpriteOption = PokemonSpriteOption.Home;
  sugimoriArtUrl?: string;
  globalLinkArtUrl?: string;
  hasSugimoriArt: boolean = false;
  hasGlobalLinkArt: boolean = false;

  constructor(private helperService: HelperService,) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadInfo();
  }

  loadInfo() {
    this.helperService.getPokemonSpriteImg(this.pokemon.name, PokemonSpriteOption.Home).subscribe(sprite => this.pokemonSprite = sprite);
    this.helperService.getPokemonSpriteImg(this.pokemon.name, PokemonSpriteOption.HomeShiny).subscribe(sprite => this.pokemonSpriteShiny = sprite);

    const artwork = this.helperService.getPokemonArtwork(this.pokemon.name);
    this.sugimoriArtUrl = artwork.sugimoriArt;
    this.globalLinkArtUrl = artwork.globalLinkArt;
    this.hasSugimoriArt = !!artwork.sugimoriArt;
    this.hasGlobalLinkArt = !!artwork.globalLinkArt;
    this.selectedImageType = PokemonSpriteOption.Home;
    this.showShiny = false;

    this.getPokemonColor();
    this.getPokemonAbility();
    this.pokemontypes = this.pokemon.types.map(type => {
      return {
        language: this.language,
        typeName: this.helperService.getTypeNameByLanguage(type.type.name, this.language)
      }
    });
    this.pokemonNameRomaji = this.pokemonSpecie.names.filter(f => f.language.name === 'roomaji')[0];
    this.pokemonNameHirgana = this.pokemonSpecie.names.filter(f => f.language.name === 'ja-Hrkt')[0];
  }

  /**
   * Devuelve la imagen principal según el tipo seleccionado.
   * Para "home" se usa la lógica existente, para el resto se prioriza el art disponible.
   */
  getMainSprite(): string {
    switch (this.selectedImageType) {
      case PokemonSpriteOption.SugimoriArt:
        return this.sugimoriArtUrl || this.pokemonSprite;
      case PokemonSpriteOption.GlobalLinkArt:
        return this.globalLinkArtUrl || this.pokemonSprite;
      default:
        return this.pokemonSprite;
    }
  }

  getPokemonColor() {
    if (this.pokemonSpecie && this.pokemonSpecie.color) {
      this.backgroundColor = this.helperService.getPokemonColor(this.pokemonSpecie.color.name);
    } else {
      this.backgroundColor = '';
    }
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

  getGenerationName(generationName: string): string {
    return this.helperService.getGenerationName(generationName, this.language);
  }

  getColorClassByLanguageAndType(typeName: string, language: string): string {
    return this.helperService.getTypeColorClass(typeName, language);
  }

  getEggGroupName(groupName: string): string {
    return this.helperService.getEggGroupName(groupName, this.language);
  }

  calculateGenderRateMale(genderRate: number): number {
    return genderRate != -1 ? 100 - (genderRate * 12.5) : 0;
  }

  calculateGenderRateFemale(genderRate: number): number {
    return genderRate != -1 ? genderRate * 12.5 : 0;
  }

  /** Segmented control for artwork type (`app-ui-button`). Ghost base styles are overridden with `!` so active/inactive read clearly. */
  imageTypeSegmentClass(type: PokemonSpriteOption): string {
    const base =
      '!px-3 !py-1.5 !text-sm !font-medium !shadow-none !ring-offset-0';
    const active =
      '!bg-blue-600 !text-white hover:!bg-blue-700 dark:!bg-blue-600 dark:!text-white ' +
      'dark:hover:!bg-blue-500 focus-visible:!ring-2 focus-visible:!ring-blue-300';
    const inactive =
      '!text-slate-800 !bg-slate-100 hover:!bg-slate-200 dark:!text-gray-100 dark:!bg-gray-700/70 ' +
      'dark:hover:!bg-gray-600';
    const state = this.selectedImageType === type ? active : inactive;
    if (type === PokemonSpriteOption.Home) {
      return `${base} !rounded-l-md !rounded-r-none ${state}`;
    }
    if (type === PokemonSpriteOption.GlobalLinkArt) {
      return `${base} !rounded-r-md !rounded-l-none ${state}`;
    }
    return `${base} !rounded-none ${state}`;
  }
}
