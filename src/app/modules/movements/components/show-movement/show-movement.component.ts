import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { DetailMove } from '../../../../../../entities/moves.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { Pokemon } from '../../../../../../entities/pokemon.entity';
import { LanguageService } from 'app/modules/shared/services/language.service';

@Component({
  selector: 'app-show-movement',
  templateUrl: './show-movement.component.html',
  styleUrls: ['./show-movement.component.scss']
})
export class ShowMovementComponent implements OnInit {

  language: string;
  backgroundColor: string = '';
  pokemonMove: string;
  moveName: string = '';
  move: DetailMove;
  pokemon: Pokemon[] = [];
  moveEffectEntry: any;

  constructor(private activatedRoute: ActivatedRoute,
              private languageService: LanguageService,
              private pokeApiService: PokeApiService,
              private helperService: HelperService,) {
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
    this.pokeApiService.getMoveByName(this.pokemonMove, 'scarlet-violet').subscribe((movement) => {
      console.log(movement);
      this.move = movement;
      this.moveName = this.getMoveNameByLanguage();
      this.moveEffectEntry = this.getMoveEffectEntryByLanguage();
      this.getPokemonDetails();
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

      const pokemon: Pokemon[] = []
      for (let i = 0; i < this.move.learned_by_pokemon.length; i++) {
        this.pokeApiService.getPokemonByName(this.move.learned_by_pokemon[i].name).subscribe((pokeInfo) => {
            if(pokeInfo.is_default === true) {
              pokemon.push(pokeInfo);
            }
        });
      }
      this.pokemon = pokemon;
  }

  getColorClassByLanguageAndType(typeName: string, language: string): string {
    return this.helperService.getTypeColorClass(typeName, language);
  }
  getTargetTypeName(targetName: string, language: string): string {
    return this.helperService.getTargetTypeName(targetName, language);
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
