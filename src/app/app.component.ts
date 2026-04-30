import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { LanguageService } from './modules/shared/services/language.service';
import { UserData } from '../../entities/auth/user.entity';
import { AuthService } from './modules/auth/services/auth.service';
import { LoadingService } from './modules/shared/services/loading.service';
import { ThemeService } from './modules/shared/services/theme.service';
import { NetworkService } from './modules/shared/services/network.service';
import { PokeApiService } from './modules/shared/services/pokeApi.service';
import { PwaInstallService } from './modules/shared/services/pwa-install.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'poochydex';

  isMenuOpen = false;
  currentLanguage: string;
  currentUser: UserData | null;
  loading = false;
  isOnline = true;
  lastDataSource: 'network' | 'cache' = 'network';
  canInstallPwa = false;

  private destroy$ = new Subject<void>();

  constructor(private languageService: LanguageService,
              private loadingService: LoadingService,
              private authService: AuthService,
              private themeService: ThemeService,
              private networkService: NetworkService,
              private pokeApiService: PokeApiService,
              private pwaInstallService: PwaInstallService,
  ) {}

  ngOnInit() {
    // Theme observable (side-effect subscription)
    this.themeService.isDarkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    // Current language
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(language => {
        this.currentLanguage = language;
      });

    // Session / user
    this.authService.sessionData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });

    // Loading flag (defer to avoid NG0100 when child routes toggle loading in the same CD cycle)
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        queueMicrotask(() => {
          this.loading = loading;
        });
      });

    // Online / offline
    this.networkService.isOnline$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isOnline => {
        this.isOnline = isOnline;
      });

    // Last PokéAPI data source (network vs cache)
    this.pokeApiService.lastDataSource$
      .pipe(takeUntil(this.destroy$))
      .subscribe(source => {
        this.lastDataSource = source;
      });

    // PWA install prompt (production only)
    if (environment.production) {
      this.pwaInstallService.canInstall$
        .pipe(takeUntil(this.destroy$))
        .subscribe(can => {
          this.canInstallPwa = can;
        });
    } else {
      // Dev: never show install prompt
      this.canInstallPwa = false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  setLanguage(language: string): void {
    this.authService.setLanguage(language);
  }

  async installPwa() {
    await this.pwaInstallService.promptInstall();
  }

}
