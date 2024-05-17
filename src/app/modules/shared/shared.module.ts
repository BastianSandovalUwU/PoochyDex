import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PokeSpritesComponent } from './pokeSprites/pokeSprites.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent,
    PokeSpritesComponent
  ],
  declarations: [
    MenuComponent,
    PokeSpritesComponent
  ]
})
export class SharedModule { }
