import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Games } from '../../../../../../entities/common/game-data';
import { PoochyDexApiService } from 'app/modules/poochyDexApi/services/poochyDexApi.service';

@Component({
  selector: 'app-show-game',
  templateUrl: './show-game.component.html',
  styleUrls: ['./show-game.component.scss']
})
export class ShowGameComponent implements OnInit {
  language: string;
  gameName: string;
  gameInfo: Games;

  constructor(private activatedRoute: ActivatedRoute,
              private pokeApiService: PokeApiService,
              private helperService: HelperService,
              private poochyDexAPiService: PoochyDexApiService,
              private languageService: LanguageService,) {
  }

  ngOnInit() {
    this.getLanguage();
    this.activatedRoute.params.subscribe((params) => {
      this.gameName = params['game'];
      this.getGameApiDex();
    });
  }

  getGameApiDex() {
    // Dividimos el string this.gameName, pero unimos "Black-2" y "White-2" como juegos completos
    const gameNamesArray = this.gameName.split('-').reduce((acc, part, index, array) => {
      if (index > 0 && /\d/.test(part)) {
        acc[acc.length - 1] += `-${part}`;  // Unimos si es parte de un juego con número (e.g. "Black-2")
      } else {
        acc.push(part);
      }
      return acc;
    }, [] as string[]);

    this.poochyDexAPiService.getAllGames().subscribe((resp) => {
      this.gameInfo = resp.filter(f => gameNamesArray.every(game => f.games.includes(game)))[0];
    });
  }

  getInfo(): void {
      this.pokeApiService.getVersionGroupInfo(this.gameName).subscribe((data) => {
        console.log(data);
        this.pokeApiService.getGenerationInfo(data.generation.name).subscribe((gen) => {
          console.log(gen);
        });
      });
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

}
