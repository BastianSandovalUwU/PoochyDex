import { Component, OnDestroy, OnInit } from '@angular/core';
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
    // Suscripción al tema (solo para activar el observable)
    this.themeService.isDarkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    // Suscripción al idioma
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(language => {
        this.currentLanguage = language;
      });

    // Suscripción a los datos de sesión
    this.authService.sessionData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });

    // Suscripción al estado de carga
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.loading = loading;
      });

    // Suscripción al estado de red
    this.networkService.isOnline$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isOnline => {
        this.isOnline = isOnline;
      });

    // Suscripción a la fuente de datos
    this.pokeApiService.lastDataSource$
      .pipe(takeUntil(this.destroy$))
      .subscribe(source => {
        this.lastDataSource = source;
      });

    // Suscripción a la disponibilidad de PWA
    this.pwaInstallService.canInstall$
      .pipe(takeUntil(this.destroy$))
      .subscribe(can => {
        this.canInstallPwa = can;
      });
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
