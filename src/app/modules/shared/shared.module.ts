import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PokeSpritesComponent } from './pokeSprites/pokeSprites.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { ReplaceDashPipe } from './pipes/replaceDash.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MenuComponent,
    PokeSpritesComponent,
    FooterComponent,
    ReplaceDashPipe
  ],
  declarations: [
    MenuComponent,
    PokeSpritesComponent,
    FooterComponent,
    ReplaceDashPipe
  ]
})
export class SharedModule { }
