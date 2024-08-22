import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowGameComponent } from './components/show-game/show-game.component';
import { RouterModule } from '@angular/router';
import { gameRoute } from './game.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(gameRoute),
    SharedModule,
  ],
  declarations: [
    ShowGameComponent
  ]
})
export class GameModule { }
