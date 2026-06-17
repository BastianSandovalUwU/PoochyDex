import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { Router } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { PokemonSpriteOption } from '../../../../../../../entities/poochydex-api/pokemon-sprite-option';
import { toggleSectionCollapseAnimations } from 'app/modules/shared/animations/toggle-section-collapse.animation';
import { Subject, takeUntil } from 'rxjs';

interface VarietyView {
  sprite: string;
  name: string;
}

@Component({
  selector: 'app-pokemon-varieties',
  templateUrl: './pokemon-varieties.component.html',
  styleUrls: ['./pokemon-varieties.component.scss'],
  animations: toggleSectionCollapseAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonVarietiesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() language: string = 'es';
  @Input() pokemonSpecie: PokemonSpecie;

  backgroundColor: string = '';
  pokemonVarieties: VarietyView[];
  pokemonId: string;
  filtersVisible = true;
  loadedSprites = new Set<string>();
  private destroy$ = new Subject<void>();

  constructor(private helperService: HelperService,
              private pokeApiService: PokeApiService,
              private router: Router,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getPokemonColor();
    this.getVarietiesInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['pokemonSpecie']) {
        this.getVarietiesInfo();
      }
      this.getPokemonColor();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  isImageLoaded(url: string): boolean { return this.loadedSprites.has(url); }
  markImageLoaded(url: string): void { this.loadedSprites.add(url); }

  trackByVariety(_index: number, variety: VarietyView): string {
    return variety.name;
  }

  getVarietiesInfo() {
    this.loadedSprites.clear();
    const pokemonVarieties: VarietyView[] = [];
    for (let i = 0; i < this.pokemonSpecie.varieties.length; i++) {
      const pokeInfo: VarietyView = {
        sprite: '',
        name: this.pokemonSpecie.varieties[i].pokemon.name
      }
      pokemonVarieties.push(pokeInfo);
      this.helperService.getPokemonSpriteImg(this.pokemonSpecie.varieties[i].pokemon.name, PokemonSpriteOption.Home)
        .pipe(takeUntil(this.destroy$))
        .subscribe(sprite => {
          pokeInfo.sprite = sprite;
          this.cdr.markForCheck();
        });
    }
    this.pokemonVarieties = pokemonVarieties;
  }

  getPokemonColor() {
    if (this.pokemonSpecie && this.pokemonSpecie.color) {
      this.backgroundColor = this.helperService.getPokemonColor(this.pokemonSpecie.color.name);
    } else {
      this.backgroundColor = '';
    }
  }

  goToPokemonPage(pokemonName: string) {
    this.router.navigate(['/pokedex/show-pokemon/', pokemonName]);
  }

  onVarietyLinkKeydown(event: KeyboardEvent, pokemonName: string): void {
    if (event.key !== 'Enter' && event.code !== 'Space') {
      return;
    }
    event.preventDefault();
    this.goToPokemonPage(pokemonName);
  }

}
