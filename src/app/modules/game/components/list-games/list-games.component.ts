import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Games } from '../../../../../../entities/common/game-data';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { PoochyDexApiService } from 'app/modules/poochyDexApi/services/poochyDexApi.service';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.scss']
})
export class ListGamesComponent implements OnInit {
  language: string;
  games: Games[] = [];

  constructor(private gamesService: GamesService,
              private poochyDexAPiService: PoochyDexApiService,
              private helperService: HelperService,
              private languageService: LanguageService,) { }

  ngOnInit() {
    this.getAllGamesApiDex();
    this.getLanguage();
  }

  getAllGamesApiDex(){
    this.poochyDexAPiService.getAllGames().subscribe((resp) => {
      console.log(resp);
      this.games = resp;
    });
  }

  getAllGames() {
    this.games = this.gamesService.getAllGames();
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  getGameName(gameName: string) {
    return this.helperService.getGameName(gameName, this.language);
  }

  getGenerationName(generationName: string): string {
    return this.helperService.getGenerationName(generationName, this.language);
  }

}
