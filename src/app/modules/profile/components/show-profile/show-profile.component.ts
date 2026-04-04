import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { UserConfigData, UserData } from '../../../../../../entities/auth/user.entity';
import { Router } from '@angular/router';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit, OnDestroy {

  userData: UserData | null = null;
  userConfig: UserConfigData | null = null;
  loading = true;
  language = 'es';
  /** Settings modal (shared `app-ui-modal` + `app-settings`). */
  settingsModalOpen = false;

  private readonly subs = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    const session = this.authService.getSessionData();
    if (!session) {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.userData = session;
    this.userConfig = this.authService.getUserConfigData();

    this.subs.add(
      this.languageService.currentLanguage$.subscribe(lang => {
        this.language = lang;
      })
    );

    this.subs.add(
      this.authService.userConfig$.subscribe(config => {
        this.userConfig = config;
      })
    );

    this.loading = false;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getRoleLabel(): string {
    if (!this.userData?.role) {
      return '';
    }
    const r = this.userData.role.toUpperCase();
    if (r === 'ADMIN') {
      return this.language === 'es' ? 'Administrador' : 'Administrator';
    }
    return this.language === 'es' ? 'Usuario' : 'User';
  }

  getLanguagePreferenceLabel(): string {
    const code = this.userConfig?.language;
    if (!code) {
      return this.language === 'es' ? 'No configurado' : 'Not set';
    }
    if (code === 'es') {
      return this.language === 'es' ? 'Español' : 'Spanish';
    }
    if (code === 'en') {
      return this.language === 'es' ? 'Inglés' : 'English';
    }
    return code;
  }

  logout(): void {
    this.loading = true;
    this.authService.logout();
    this.router.navigate(['/pokedex']);
  }

}
