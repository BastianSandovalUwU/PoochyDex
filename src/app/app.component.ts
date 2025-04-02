import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LanguageService } from './modules/shared/services/language.service';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserData } from '../../entities/auth/user.entity';
import { AuthService } from './modules/auth/services/auth.service';
import { LoadingService } from './modules/shared/services/loading.service';
import { HelperService } from './modules/shared/services/helper.service';

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
              private updates: SwUpdate,
              private loadingService: LoadingService,
              private authService: AuthService,
              private helperService: HelperService,
              private cdr: ChangeDetectorRef,
              private snackBar: MatSnackBar
  ) {
    if (this.updates.isEnabled) {
      this.updates.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
          this.showUpdateSnackBar();
        }
      });
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
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

  showUpdateSnackBar() {
    const snackBarRef = this.snackBar.open('Nueva versión disponible', 'Actualizar', {
      duration: 6000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    snackBarRef.onAction().subscribe(() => {
      window.location.reload();
    });
  }

}
