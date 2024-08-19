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
import { HyperlinkComponent } from './hyperlink/hyperlink.component';
import { RouterModule } from '@angular/router';
import { TranslatePokemonNamePipe } from './pipes/translate-pokemon-name.pipe';
import { TranslateLocalizationMethodPipe } from './pipes/translate-localization-method.pipe';
import { TranslateLocalizationNamePipe } from './pipes/translate-localization-name.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    PokeSpritesComponent,
    FooterComponent,
    ReplaceDashPipe,
    TranslateEvoMethodPipe,
    SearchButtonComponent,
    TranslatePokedexNamePipe,
    HyperlinkComponent,
    TranslatePokemonNamePipe,
    TranslateLocalizationMethodPipe,
    TranslateLocalizationNamePipe
  ],
  declarations: [
    MenuComponent,
    PokeSpritesComponent,
    FooterComponent,
    ReplaceDashPipe,
    TranslateEvoMethodPipe,
    SearchButtonComponent,
    TranslatePokedexNamePipe,
    HyperlinkComponent,
    TranslatePokemonNamePipe,
    TranslateLocalizationMethodPipe,
    TranslateLocalizationNamePipe
  ]
})
export class SharedModule { }
