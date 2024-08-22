import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';

@Component({
  selector: 'app-show-game',
  templateUrl: './show-game.component.html',
  styleUrls: ['./show-game.component.scss']
})
export class ShowGameComponent implements OnInit {
  language: string;
  gameName: string;

  constructor(private activatedRoute: ActivatedRoute,
              private pokeApiService: PokeApiService,
              private helperService: HelperService,
              private languageService: LanguageService,) {
  }

  ngOnInit() {
    this.getLanguage();
    this.activatedRoute.params.subscribe((params) => {
      this.gameName = params['game'];
      this.getInfo();
    });
  }

  getInfo(): void {
      this.pokeApiService.getVersionGroupInfo(this.gameName).subscribe((data) => {
        console.log(data);
        this.pokeApiService.getGenerationInfo(data.generation.name).subscribe((gen) => {
          console.log(gen);
        });
      });
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  getGameName(gameName: string): string[] {
    if(this.language === 'es') {
      switch (gameName) {
        case 'red-blue': return ['Rojo', 'Azul'];
        case 'gold-silver': return ['Oro', 'Plata'];
        case 'crystal': return ['Cristal'];
        case 'ruby-sapphire': return ['Rubí', ' Zafiro'];
        case 'emerald': return ['Esmeralda'];
        case 'firered-leafgreen': return ['Rojo Fuego', 'Verde Hoja'];
        case 'diamond-pearl': return ['Diamante', 'Perla'];
        case 'heartgold-soulsilver': return ['Oro HeartGold', 'Plata SoulSilver'];
        case 'black-white': return ['Negro', 'Blanco'];
        case 'black-2-white-2': return ['Negro 2', 'Blanco 2'];
        case 'x-y': return ['X', 'Y'];
        case 'omega-ruby-alpha-sapphire': return ['Rubí Omega', 'Zafiro Alfa'];
        case 'sun-moon': return ['Sol', 'Luna'];
        case 'ultra-sun-ultra-moon': return ['Ultrasol', 'Ultraluna'];
        case 'lets-go-pikachu-lets-go-eevee': return ["Let's Go, Pikachu!", "Let's Go, Eevee!"];
        case 'sword-shield': return ['Espada', 'Escudo'];
        case 'scarlet-violet': return ['Escarlata', 'Purpura'];
        case 'brilliant-diamond-and-shining-pearl': return ['Diamante Brillante', 'Perla Reluciente'];
        case 'legends-arceus': return ['Legendas Arceus'];
        default: return[]
      }
    } else {
      switch (gameName) {
        case 'red-blue': return ['Red', 'Blue'];
        case 'gold-silver': return ['Gold', 'Silver'];
        case 'crystal': return ['Crystal'];
        case 'ruby-sapphire': return ['Ruby', ' Sapphire'];
        case 'emerald': return ['Emerald'];
        case 'firered-leafgreen': return ['Firered', 'Leafgreen'];
        case 'diamond-pearl': return ['Diamond', 'Pearl'];
        case 'platinum': return ['Platinum'];
        case 'heartgold-soulsilver': return ['HeartGold', 'SoulSilver'];
        case 'black-white': return ['Black', 'White'];
        case 'black-2-white-2': return ['Black 2', 'White 2'];
        case 'x-y': return ['X', 'Y'];
        case 'omega-ruby-alpha-sapphire': return ['Omega Ruby', 'Alfa Sapphire'];
        case 'sun-moon': return ['Sun', 'Moon'];
        case 'ultra-sun-ultra-moon': return ['ultraSun', 'UltraMoon'];
        case 'lets-go-pikachu-lets-go-eevee': return ["Let's Go, Pikachu!", "Let's Go, Eevee!"];
        case 'sword-shield': return ['Sword', 'Shield'];
        case 'scarlet-violet': return ['Scarlet', 'Violet'];
        case 'brilliant-diamond-and-shining-pearl': return ['Brilliant Diamond', 'Shining Pearl'];
        case 'legends-arceus': return ['Legends Arceus'];
        default: return[]
    }
  }
}

}
