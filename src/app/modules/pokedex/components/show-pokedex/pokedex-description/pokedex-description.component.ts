import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokedex-description',
  templateUrl: './pokedex-description.component.html',
  styleUrls: ['./pokedex-description.component.scss']
})
export class PokedexDescriptionComponent implements OnInit {
  @Input() pokedexName: string;
  showKantoDex:  boolean = false;
  showJohtoDex:  boolean = false;
  showHoennDex:  boolean = false;
  showSinnohDex: boolean = false;
  showUnovaDex:  boolean = false;
  showKalosDex:  boolean = false;
  showAlolaDex:  boolean = false;
  showGalarDex:  boolean = false;
  showHisuiDex:  boolean = false;
  showPaldeaDex: boolean = false;
  showKitakamiDex: boolean = false;
  showBlueberryDex: boolean = false;

  constructor() { }

  ngOnInit() {
    this.getPokedexDescription(this.pokedexName);
  }

  getPokedexDescription(pokedexName: string): void {
    switch (pokedexName) {
        case "national" : '';
          break
        case "kanto" : this.showKantoDex = true;
          break;
        case "johto" : this.showJohtoDex = true;
          break;
        case "original-johto" : this.showJohtoDex = true;
          break;
        case "hoenn" : this.showHoennDex = true;
          break;
        case "sinnoh" : this.showSinnohDex = true;
          break;
        case "original-sinnoh" : this.showSinnohDex = true;
          break;
        case "extended-sinnoh" : this.showSinnohDex = true;
          break;
        case "updated-johto" : this.showJohtoDex = true;
          break;
        case "unova" : this.showUnovaDex = true;
          break;
        case "unova-2" : this.showUnovaDex = true;
          break;
        case "original-unova" : this.showUnovaDex = true;
          break;
        case "updated-unova" : this.showUnovaDex = true;
          break;
        // case "conquest-gallery" : return 'Conquest';
        case "kalos-central" : this.showUnovaDex = true;
          break;
        case "kalos-coastal" : this.showUnovaDex = true;
          break;
        case "kalos-mountain" : this.showUnovaDex = true;
          break;
        case "updated-hoenn" : this.showHoennDex = true;
          break;
        case "original-alola" : this.showAlolaDex = true;
          break;
        case "alola" : this.showAlolaDex = true;
          break;
        case "alola-ultra" : this.showAlolaDex = true;
          break;
        case "original-melemele" : this.showAlolaDex = true;
          break;
        case "original-akala" : this.showAlolaDex = true;
          break;
        case "original-ulaula" : this.showAlolaDex = true;
          break;
        case "original-poni" : this.showAlolaDex = true;
          break;
        case "updated-alola" : this.showAlolaDex = true;
          break;
        case "updated-melemele" : this.showAlolaDex = true;
          break;
        case "updated-akala" : this.showAlolaDex = true;
          break;
        case "updated-ulaula" : this.showAlolaDex = true;
          break
        case "updated-poni" : this.showAlolaDex = true;
          break;
        case "letsgo" : this.showKantoDex = true;
          break;
        case "letsgo-kanto" : this.showKantoDex = true;
          break;
        case "galar" : this.showGalarDex = true;
          break;
        case "isle-of-armor" : this.showGalarDex = true;
          break;
        case "crown-tundra" : this.showGalarDex = true;
          break;
        case "hisui" : this.showHisuiDex = true;
          break;
        case "paldea" : this.showPaldeaDex = true;
          break;
        case "kitakami" : this.showKitakamiDex = true;
          break;
        case "blueberry" : this.showBlueberryDex = true;
          break;
      default:
        break;
    }

  }

}
