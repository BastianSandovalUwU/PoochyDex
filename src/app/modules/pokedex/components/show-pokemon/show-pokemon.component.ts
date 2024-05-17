import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { Pokemon } from '../../../../../../entities/pokemon.entity';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { PokemonSpecie } from '../../../../../../entities/pokemon-specie.entity';
import { Other } from '../../../../../../entities/sprites.entity';
import { Versions } from '../../../../../../entities/versions.entity';

@Component({
  selector: 'app-show-pokemon',
  templateUrl: './show-pokemon.component.html',
  styleUrls: ['./show-pokemon.component.scss']
})
export class ShowPokemonComponent implements OnInit {

  language: string = 'es';
  pokemonName: string;
  pokemon: Pokemon;
  pokemontypes: { language: string, typeName: string }[][];
  pokemonSpecie: PokemonSpecie;

  otherSprites: Other;
  versionSprites: Versions;

  constructor(private pokeApiService: PokeApiService,
              private helperService: HelperService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ name }) => {
      this.pokemonName = name;
      this.getPokemonByName();
    });
  }

  getPokemonByName() {
    this.pokeApiService.getPokemonByName(this.pokemonName).subscribe((pokeInfo) => {
      console.log(pokeInfo);
      this.pokemon = pokeInfo;
      this.otherSprites = pokeInfo.sprites.other;
      this.versionSprites = pokeInfo.sprites.versions;
      this.getPokemonSpecie();
      this.helperService.getPokemonTypes(this.pokemon.types).subscribe((types) => {
        this.pokemontypes = types;
      });
    });
  }

  getPokemonSpecie() {
    this.pokeApiService.getPokemonSpecieById(this.pokemon.id).subscribe((specie) => {
      console.log(specie);
      this.pokemonSpecie = specie;
    });
  }

  getColorClassByLanguageAndType(typeName: string, language: string): string {
      return this.helperService.getTypeColorClass(typeName, language);
  }

  playAudio(idAudio: string) {
    var audioPlayer = document.getElementById(idAudio) as HTMLAudioElement;
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }

}
