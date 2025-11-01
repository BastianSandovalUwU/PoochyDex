import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'app/modules/shared/services/language.service';

interface PokedexOption {
  id: number;
  name: string;
  nameEs: string;
}

@Component({
  selector: 'app-pokemon-hunt',
  templateUrl: './pokemon-hunt.component.html',
  styleUrls: ['./pokemon-hunt.component.scss']
})
export class PokemonHuntComponent implements OnInit {
  language: string;
  selectedPokedexNumber: number | null = null;
  isExpanded: boolean = true;

  pokedexOptions: PokedexOption[] = [
    { id: 2, name: 'Kanto', nameEs: 'Kanto' },
    { id: 3, name: 'Johto', nameEs: 'Johto' },
    { id: 4, name: 'Hoenn', nameEs: 'Hoenn' },
    { id: 5, name: 'Original Sinnoh', nameEs: 'Sinnoh' },
    { id: 7, name: 'Updated Johto', nameEs: 'Johto Remakes' },
    { id: 8, name: 'Original Unova', nameEs: 'Unova Original' },
    { id: 12, name: 'Kalos Central', nameEs: 'Kalos Central' },
    { id: 13, name: 'Kalos Coastal', nameEs: 'Kalos Costera' },
    { id: 14, name: 'Kalos Mountain', nameEs: 'Kalos Montaña' },
    { id: 15, name: 'Updated Hoenn', nameEs: 'Hoenn Remakes' },
    { id: 16, name: 'Original Alola', nameEs: 'Alola Original' },
    { id: 21, name: 'Updated Alola', nameEs: 'Alola Ultra' },
    { id: 22, name: 'Melemele', nameEs: 'Melemele' },
    { id: 23, name: 'Akala', nameEs: 'Akala' },
    { id: 24, name: 'Ula\'ula', nameEs: 'Ula\'ula' },
    { id: 25, name: 'Poni', nameEs: 'Poni' },
    { id: 26, name: 'Let\'s Go Kanto', nameEs: 'Let\'s Go Kanto' },
    { id: 27, name: 'Galar', nameEs: 'Galar' },
    { id: 28, name: 'Isle of Armor', nameEs: 'Isla de la Armadura' },
    { id: 29, name: 'Crown Tundra', nameEs: 'Las Nieves de la Corona' },
    { id: 30, name: 'Hisui', nameEs: 'Hisui' },
    { id: 31, name: 'Paldea', nameEs: 'Paldea' },
    { id: 32, name: 'Kitakami', nameEs: 'Noroteo' },
    { id: 33, name: 'Blueberry', nameEs: 'Academia Arándano' },
    { id: 34, name: 'Lumiose City', nameEs: 'Ciudad Lumiose' }
  ];

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.getLanguage();
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  selectPokedex(pokedexId: number) {
    if (this.selectedPokedexNumber === pokedexId) {
      this.isExpanded = true;
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
