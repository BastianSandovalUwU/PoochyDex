import { Component, Input, OnInit, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../services/helper.service';
import { LanguageService } from '../services/language.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-hyperlink',
    templateUrl: './hyperlink.component.html',
    styleUrls: ['./hyperlink.component.scss'],
    standalone: false
})
export class HyperlinkComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  @Input() value: string = '';
  @Input() type: 'pokemon' | 'game' | 'localization';
  @Input() textBlue: boolean = true;
  language: string;

  constructor(private router: Router, private helperService: HelperService,
              private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.getLanguage()
  }

  getLanguage() {
    this.languageService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(language => {
      this.language = language;
    });
  }

  redirecTo(): void {
    let url = '';
    switch (this.type) {
      case 'pokemon':
        url = '/pokedex/show-pokemon/' + this.value.toLowerCase();
        this.routerTo(url);
        break;
      case 'game': {
        const name = this.navigateToGame(this.value);
        if(name === '') {
          console.error('juego no agregado')
          return;
        }
        url = '/game/show-game/' + name;
        this.routerTo(url);
        break;
      }
      default:
        break;
    }
  }

  routerTo(url: string) {
    this.router.navigateByUrl(url);
  }

  getGameName(gameName: string): string {
    return this.helperService.getGameName(gameName, this.language);
  }

  navigateToGame(gameName: string): string {
    const name = this.helperService.navigateToGame(gameName);
    return name;
  }

}
