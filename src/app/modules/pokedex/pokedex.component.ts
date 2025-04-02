import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ALL_POKEMON } from '../../../../entities/common/const.interface';
import { Router } from '@angular/router';
import { LoadingService } from '../shared/services/loading.service';
import { HelperService } from '../shared/services/helper.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: []
})
export class PokedexComponent implements OnInit {

  randomPokemon: string = '';
  pokemonList = ALL_POKEMON;
  loading = true;
  isCacheLoading = false;
  cacheProgress = 0;

  constructor(private router: Router,
              private helperService: HelperService,
              private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.helperService.isCacheLoading$.subscribe(isLoading => {
      this.isCacheLoading = isLoading;
      this.loading = isLoading;
      this.cdr.detectChanges();
    });

    this.helperService.cacheLoadingProgress$.subscribe(progress => {
      this.cacheProgress = progress;
      this.cdr.detectChanges();
    });

    this.helperService.isCacheLoading$.subscribe(isLoading => {
      if (!isLoading) {
        this.randomPokemon = this.getRandomPokemon();
        this.router.navigate(['/pokedex/show-pokemon/', this.randomPokemon]);
      }
    });
  }

  getRandomPokemon(): any {
    const index = Math.floor(Math.random() * this.pokemonList.length);
    return this.pokemonList[index].name;
  }

}
