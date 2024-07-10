import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PokeSpritesComponent } from './pokeSprites/pokeSprites.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { ReplaceDashPipe } from './pipes/replaceDash.pipe';
import { SearchButtonComponent } from './search-button/search-button.component';
import { FormsModule } from '@angular/forms';
import { TranslateEvoMethodPipe } from './pipes/translateEvoMethod.pipe';
import { TranslatePokedexNamePipe } from './pipes/translate-pokedex-name.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    MenuComponent,
    PokeSpritesComponent,
    FooterComponent,
    ReplaceDashPipe,
    TranslateEvoMethodPipe,
    SearchButtonComponent,
    TranslatePokedexNamePipe
  ],
  declarations: [
    MenuComponent,
    PokeSpritesComponent,
    FooterComponent,
    ReplaceDashPipe,
    TranslateEvoMethodPipe,
    SearchButtonComponent,
    TranslatePokedexNamePipe
  ]
})
export class SharedModule { }
