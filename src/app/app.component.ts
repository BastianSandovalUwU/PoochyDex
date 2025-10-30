import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LanguageService } from './modules/shared/services/language.service';
import { UserData } from '../../entities/auth/user.entity';
import { AuthService } from './modules/auth/services/auth.service';
import { LoadingService } from './modules/shared/services/loading.service';
import { HelperService } from './modules/shared/services/helper.service';
import { ThemeService } from './modules/shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'poochydex';

  isMenuOpen = false;
  currentLanguage: string;
  currentUser: UserData | null;
  loading = false;
  isCacheLoading = false;

  constructor(private languageService: LanguageService,
              private loadingService: LoadingService,
              private authService: AuthService,
              private helperService: HelperService,
              private themeService: ThemeService,
              private cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe();
    this.helperService.isCacheLoading$.subscribe(isLoading => {
      this.isCacheLoading = isLoading;
      this.loading = isLoading;
      this.cdr.detectChanges();
    });

    this.helperService.createAllPokemonCache();

    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });

    this.authService.sessionData$.subscribe(user => {
      this.currentUser = user;
    });

    this.loadingService.loading$.subscribe((loading) => {
      if (!this.isCacheLoading) {
        this.loading = loading;
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 100);
        this.cdr.detectChanges();
      }
    });

    // if(this.authService.isAuthenticated()) {
    //   this.authService.userConfig$.subscribe(userConfig => {
    //     this.currentLanguage = userConfig.language;
    //   });
    // }
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

  onRefreshCacheRequested() {
    this.helperService.createAllPokemonCache();
  }

}
