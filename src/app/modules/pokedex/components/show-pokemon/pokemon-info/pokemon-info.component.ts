import {
  afterNextRender,
  Component,
  ElementRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { Ability, Pokemon } from '../../../../../../../entities/pokemon.entity';
import { Name, PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { AbilityName } from '../../../../../../../entities/pokemon-ability.entity';
import { PokemonSpriteOption } from '../../../../../../../entities/poochydex-api/pokemon-sprite-option';
import { detailFadeInAnimations } from 'app/modules/shared/animations/detail-fade-in.animation';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss'],
  animations: detailFadeInAnimations
})
export class PokemonInfoComponent implements OnInit, OnChanges, OnDestroy {
  /** Exposed for template bindings (Angular templates cannot reference imported enums). */
  readonly PokemonSpriteOption = PokemonSpriteOption;

  @Input() language: string;
  @Input() pokemon: Pokemon;
  @Input() pokemonSpecie: PokemonSpecie;
  @Input() pokemonSprite: string;
  @Input() pokemonSpriteShiny: string;
  @Input() filteredAbilityNames: { ability: Ability, name: string }[];

  backgroundColor: string = '';
  pokemontypes: { language: string, typeName: string }[] = [];
  showShiny: boolean = false;
  pokemonNameRomaji: Name;
  pokemonNameHirgana: Name;

  selectedImageType: PokemonSpriteOption = PokemonSpriteOption.Home;
  sugimoriArtUrl?: string;
  globalLinkArtUrl?: string;
  hasSugimoriArt: boolean = false;
  hasGlobalLinkArt: boolean = false;

  displayedImageLoaded = false;

  private spriteLoadSub?: Subscription;

  constructor(
    private helperService: HelperService,
    private hostEl: ElementRef<HTMLElement>,
    private injector: Injector
  ) {}

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.spriteLoadSub?.unsubscribe();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.loadInfo();
  }

  loadInfo() {
    if (!this.pokemon?.name || !this.pokemonSpecie) {
      return;
    }

    this.displayedImageLoaded = false;
    this.spriteLoadSub?.unsubscribe();

    this.spriteLoadSub = forkJoin({
      home: this.helperService.getPokemonSpriteImg(this.pokemon.name, PokemonSpriteOption.Home),
      shiny: this.helperService.getPokemonSpriteImg(this.pokemon.name, PokemonSpriteOption.HomeShiny)
    }).subscribe({
      next: ({ home, shiny }) => {
        this.pokemonSprite = home;
        this.pokemonSpriteShiny = shiny;
        if (!home) {
          this.displayedImageLoaded = true;
        } else {
          this.scheduleSpriteDecodeSync();
        }
      },
      error: () => {
        this.displayedImageLoaded = true;
      }
    });

    const artwork = this.helperService.getPokemonArtwork(this.pokemon.name);
    this.sugimoriArtUrl = artwork.sugimoriArt;
    this.globalLinkArtUrl = artwork.globalLinkArt;
    this.hasSugimoriArt = !!artwork.sugimoriArt;
    this.hasGlobalLinkArt = !!artwork.globalLinkArt;
    this.selectedImageType = PokemonSpriteOption.Home;
    this.showShiny = false;

    this.getPokemonColor();
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

  /** Order of sprite tabs shown in the UI (Home always; others if artwork exists). */
  visibleSpriteOptions(): PokemonSpriteOption[] {
    const options: PokemonSpriteOption[] = [PokemonSpriteOption.Home];
    if (this.hasSugimoriArt) {
      options.push(PokemonSpriteOption.SugimoriArt);
    }
    if (this.hasGlobalLinkArt) {
      options.push(PokemonSpriteOption.GlobalLinkArt);
    }
    return options;
  }

  selectImageType(type: PokemonSpriteOption): void {
    this.selectedImageType = type;
    this.showShiny = false;
    this.displayedImageLoaded = false;
    this.scheduleSpriteDecodeSync();
  }

  setShowShiny(value: boolean): void {
    this.showShiny = value;
    this.displayedImageLoaded = false;
    this.scheduleSpriteDecodeSync();
  }

  private scheduleSpriteDecodeSync(): void {
    afterNextRender(
      () => {
        this.syncDisplayedSpriteIfAlreadyDecoded();
        requestAnimationFrame(() => this.syncDisplayedSpriteIfAlreadyDecoded());
      },
      { injector: this.injector }
    );
  }

  private syncDisplayedSpriteIfAlreadyDecoded(): void {
    const img = this.hostEl.nativeElement.querySelector(
      '.pokemon-info__sprite-frame img'
    );
    if (img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0) {
      this.onMainSpriteLoad();
    }
  }

  onMainSpriteLoad(): void {
    this.displayedImageLoaded = true;
  }

  onMainSpriteError(): void {
    this.displayedImageLoaded = true;
  }

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

    const visible = this.visibleSpriteOptions();
    const idx = visible.indexOf(type);
    const isFirst = idx === 0;
    const isLast = idx === visible.length - 1;
    let rounding = '!rounded-none';
    if (isFirst && isLast) {
      rounding = '!rounded-md';
    } else if (isFirst) {
      rounding = '!rounded-l-md !rounded-r-none';
    } else if (isLast) {
      rounding = '!rounded-r-md !rounded-l-none';
    }

    return `${base} ${rounding} ${state}`;
  }
}
