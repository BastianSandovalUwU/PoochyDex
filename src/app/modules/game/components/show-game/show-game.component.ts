import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Games } from '../../../../../../entities/common/game-data';
import { GamesService } from '../../services/games.service';

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
              private gamesService: GamesService,
              private languageService: LanguageService,) {
  }

  ngOnInit() {
    this.getLanguage();
    this.activatedRoute.params.subscribe((params) => {
      this.gameName = params['game'];
      this.getGameInfo();
      this.getInfo();
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

  getGameInfo() {
    switch (this.gameName) {
      case 'red-blue':
        this.gameInfo = this.gamesService.getPokemonRedBlueData();
        break;
      case 'yellow':
        this.gameInfo = this.gamesService.getPokemonYellowData();
        break;
      case 'gold-silver':
        this.gameInfo = this.gamesService.getPokemonGoldSilverData();
        break;
      case 'crystal':
        this.gameInfo = this.gamesService.getPokemonCrystalData();
        break;
      case 'ruby-sapphire':
        this.gameInfo = this.gamesService.getPokemonRubySapphireData();
        break;

      default: null
        break;
    }
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

}
