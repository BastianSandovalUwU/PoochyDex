import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PokeSpritesComponent } from './pokeSprites/pokeSprites.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MenuComponent,
    PokeSpritesComponent,
  ],
  declarations: [
    MenuComponent,
    PokeSpritesComponent,
  ]
})
export class SharedModule { }
