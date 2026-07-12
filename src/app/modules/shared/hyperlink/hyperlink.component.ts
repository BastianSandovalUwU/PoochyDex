import { Component, Input, OnInit, DestroyRef, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../services/helper.service';
import { LanguageService } from '../services/language.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-hyperlink',
    templateUrl: './hyperlink.component.html',
    styleUrls: ['./hyperlink.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HyperlinkComponent implements OnInit {
  private router = inject(Router);
  private helperService = inject(HelperService);
  private languageService = inject(LanguageService);

  private destroyRef = inject(DestroyRef);
  @Input() value: string = '';
  @Input() type: 'pokemon' | 'game' | 'localization';
  @Input() textBlue: boolean = true;
  language: string;

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
    switch (this.type) {
      case 'pokemon':
        this.routerTo('/pokedex/show-pokemon/' + this.value.toLowerCase());
        break;
      case 'game': {
        const name = this.navigateToGame(this.value);
        if(name === '') {
          console.error('game not added')
          return;
        }
        this.routerTo('/game/show-game/' + name);
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
