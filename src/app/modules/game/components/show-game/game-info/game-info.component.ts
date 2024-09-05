import { Component, Input, OnInit } from '@angular/core';
import { GamesService } from 'app/modules/game/services/games.service';
import { Games, ReleaseDate } from '../../../../../../../entities/common/game-data';
import { HelperService } from 'app/modules/shared/services/helper.service';

interface GroupedReleaseDates {
  region: string;
  consoles: { console: string, dates: string[] }[];
}

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {
  @Input() language: string;
  @Input() gameInfo: Games;

  constructor(private gamesService: GamesService,
              private helperService: HelperService
  ) { }

  ngOnInit() {
  }

  getGameName(gameName: string) {
    return this.helperService.getGameName(gameName, this.language);
  }

  getGenerationName(generationName: string): string {
    return this.helperService.getGenerationName(generationName, this.language);
  }

}
