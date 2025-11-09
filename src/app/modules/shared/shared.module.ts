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
import { UpButtonComponent } from './up-button/up-button.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NewUpdateViewComponent } from './new-update-view/new-update-view.component';
import { ErrorMessageViewComponent } from './error-message-view/error-message-view.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { PokemonHuntListComponent } from './pokemon-hunt-list/pokemon-hunt-list.component';
import { PokemonMovesTableComponent } from './pokemon-moves-table/pokemon-moves-table.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    RouterModule,
    MatTabsModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    RouterModule,
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
    TranslateLocalizationNamePipe,
    UpButtonComponent,
    LoadingSpinnerComponent,
    NewUpdateViewComponent,
    ErrorMessageViewComponent,
    ThemeToggleComponent,
    ConfirmationModalComponent,
    PokemonHuntListComponent,
    PokemonMovesTableComponent
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
    TranslateLocalizationNamePipe,
    UpButtonComponent,
    LoadingSpinnerComponent,
    NewUpdateViewComponent,
    ErrorMessageViewComponent,
    ThemeToggleComponent,
    ConfirmationModalComponent,
    PokemonHuntListComponent,
    PokemonMovesTableComponent
  ]
})
export class SharedModule { }
