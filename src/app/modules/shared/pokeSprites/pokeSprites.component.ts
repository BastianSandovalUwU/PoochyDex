import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../../../../entities/pokemon.entity';
import { Other } from '../../../../../entities/sprites.entity';
import { Versions } from '../../../../../entities/versions.entity';

@Component({
  selector: 'app-pokeSprites',
  templateUrl: './pokeSprites.component.html',
  styleUrls: ['./pokeSprites.component.scss']
})
export class PokeSpritesComponent implements OnInit {
  @Input() pokemon: Pokemon;

  otherSprites: Other;
  versionSprites: Versions;

  constructor() { }

  ngOnInit() {
    this.otherSprites = this.pokemon.sprites.other;
    this.versionSprites = this.pokemon.sprites.versions;
  }

}
