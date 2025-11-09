import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { PokedexOption } from '../../../../../../entities/pokemon-hunt.entity';
import { ALL_POKEDEX_OPTIONS } from '../../../../../../entities/common/const.interface';

@Component({
  selector: 'app-pokemon-hunt',
  templateUrl: './pokemon-hunt.component.html',
  styleUrls: ['./pokemon-hunt.component.scss']
})
export class PokemonHuntComponent implements OnInit {
  language: string;
  selectedPokedexNumber: number | null = null;
  isExpanded: boolean = false;
  pokedexOptions = ALL_POKEDEX_OPTIONS;

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.getLanguage();
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
    if (!this.isExpanded) {
      this.selectedPokedexNumber = null;
    }
  }

  selectPokedex(pokedexId: number) {
    if (this.selectedPokedexNumber === pokedexId) {
      this.isExpanded = false;
      this.selectedPokedexNumber = null;
    } else {
      this.selectedPokedexNumber = pokedexId;
      this.isExpanded = false;
    }
  }

  getPokedexName(pokedex: PokedexOption): string {
    return this.language === 'es' ? pokedex.nameEs : pokedex.name;
  }

  getVisiblePokedex(): PokedexOption[] {
    if (this.isExpanded || !this.selectedPokedexNumber) {
      return this.pokedexOptions;
    }
    return this.pokedexOptions.filter(p => p.id === this.selectedPokedexNumber);
  }

  isSelected(pokedexId: number): boolean {
    return this.selectedPokedexNumber === pokedexId;
  }
}
