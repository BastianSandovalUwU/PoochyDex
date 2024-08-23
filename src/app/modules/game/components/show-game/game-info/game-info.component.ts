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
  groupedReleaseDates: any;

  constructor(private gamesService: GamesService,
              private helperService: HelperService
  ) { }

  ngOnInit() {
    this.groupReleaseDates(this.gameInfo.releaseDates);
    console.log(this.groupedReleaseDates);
  }

  groupReleaseDates(releaseDates: any) {
    const grouped = releaseDates.reduce((acc, release) => {
      let regionGroup = acc.find(group => group.region === release.region);
      if (!regionGroup) {
        regionGroup = { region: release.region, consoles: [] };
        acc.push(regionGroup);
      }

      let consoleGroup = regionGroup.consoles.find(console => console.console === release.console);
      if (!consoleGroup) {
        consoleGroup = { console: release.console, dates: [] };
        regionGroup.consoles.push(consoleGroup);
      }

      consoleGroup.dates.push(release.date);
      if (release.date2) {
        consoleGroup.dates.push(release.date2);
      }

      return acc;
    }, [] as GroupedReleaseDates[]);

    this.groupedReleaseDates = grouped;
  }

  getGameName(gameName: string) {
    return this.helperService.getGameName(gameName, this.language);
  }

  getGenerationName(generationName: string): string {
    return this.helperService.getGenerationName(generationName, this.language);
  }

}
