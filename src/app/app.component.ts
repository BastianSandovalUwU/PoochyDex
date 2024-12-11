import { Component } from '@angular/core';
import { LanguageService } from './modules/shared/services/language.service';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserData } from '../../entities/auth/user.entity';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poochydex';

  isMenuOpen = false;
  currentLanguage: string;
  currentUser: UserData | null;

  constructor(private languageService: LanguageService,
              private updates: SwUpdate,
              private authService: AuthService,
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

  ngOnInit() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });

    this.authService.sessionData$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  setLanguage(language: string): void {
    this.languageService.setLanguage(language);
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
