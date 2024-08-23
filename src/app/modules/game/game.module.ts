import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowGameComponent } from './components/show-game/show-game.component';
import { RouterModule } from '@angular/router';
import { gameRoute } from './game.routing';
import { SharedModule } from '../shared/shared.module';
import { GameInfoComponent } from './components/show-game/game-info/game-info.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(gameRoute),
    SharedModule,
  ],
  declarations: [
    ShowGameComponent,
    GameInfoComponent
  ]
})
export class GameModule { }
