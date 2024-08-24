import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowGameComponent } from './components/show-game/show-game.component';
import { RouterModule } from '@angular/router';
import { gameRoute } from './game.routing';
import { SharedModule } from '../shared/shared.module';
import { GameInfoComponent } from './components/show-game/game-info/game-info.component';
import { ListGamesComponent } from './components/list-games/list-games.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(gameRoute),
    SharedModule,
  ],
  declarations: [
    ShowGameComponent,
    GameInfoComponent,
    ListGamesComponent
  ]
})
export class GameModule { }
