import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Ability, Pokemon } from '../../../../../../../entities/pokemon.entity';
import { Name, PokemonSpecie } from '../../../../../../../entities/pokemon-specie.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { AbilityName } from '../../../../../../../entities/pokemon-ability.entity';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss']
})
export class PokemonInfoComponent implements OnInit, OnChanges {
  @Input() language: string;
  @Input() pokemon: Pokemon;
  @Input() pokemonSpecie: PokemonSpecie;

  backgroundColor: string = '';
  pokemontypes: { language: string, typeName: string }[][];
  filteredAbilityNames: { ability: Ability, name: string }[] = [];
  abilityNames: { ability: Ability, names: AbilityName[] }[];
  showShiny: boolean = false;
  pokemonNameRomaji: Name;
  pokemonNameHirgana: Name;
  pokemonId: string;

  constructor(private helperService: HelperService,) { }

  ngOnInit() {
    this.pokemonId = this.helperService.getPokemonSpriteImg(this.pokemon.name);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadInfo();
  }

  loadInfo() {
    this.pokemonId = this.helperService.getPokemonSpriteImg(this.pokemon.name);
    this.getPokemonColor();
    this.showShiny = false;
    this.getPokemonAbility();
    this.helperService.getPokemonTypes(this.pokemon.types).subscribe((types) => {
      this.pokemontypes = types;
    });
    this.pokemonNameRomaji = this.pokemonSpecie.names.filter(f => f.language.name === 'roomaji')[0];
    this.pokemonNameHirgana = this.pokemonSpecie.names.filter(f => f.language.name === 'ja-Hrkt')[0];
  }

  getPokemonColor() {
    if (this.pokemonSpecie && this.pokemonSpecie.color) {
      this.backgroundColor = this.helperService.getPokemonColor(this.pokemonSpecie.color.name);
    } else {
      this.backgroundColor = ''; // Asigna una cadena vacía si no hay color
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
    return 100 - (genderRate * 12.5);
  }

  calculateGenderRateFemale(genderRate: number): number {
    return genderRate * 12.5;
}

}
