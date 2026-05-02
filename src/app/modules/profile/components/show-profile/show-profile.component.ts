import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { UserConfigData, UserData } from '../../../../../../entities/auth/user.entity';
import { Router } from '@angular/router';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { UserSettingsService } from 'app/modules/shared/services/user-settings.service';
import { ProfileAvatarService } from 'app/modules/shared/services/profile-avatar.service';
import { detailFadeInAnimations } from 'app/modules/shared/animations/detail-fade-in.animation';
import { HomeScreenOption, LanguageLabel, LanguageOption, PreferredSpriteOption, RoleEnglishLabel, RoleName, RoleSpanishLabel } from '../../../../../../entities/common/enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss'],
  animations: detailFadeInAnimations
})
export class ShowProfileComponent implements OnInit, OnDestroy {

  userData: UserData | null = null;
  userConfig: UserConfigData | null = null;
  loading = true;
  language = 'es';
  settingsModalOpen = false;
  avatarModalOpen = false;
  avatarUrl: string | null = null;

  private readonly subs = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private languageService: LanguageService,
    private userSettingsService: UserSettingsService,
    private profileAvatarService: ProfileAvatarService
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

    this.subs.add(
      this.profileAvatarService.avatar$.subscribe(() => {
        this.avatarUrl = this.profileAvatarService.getAvatarUrl();
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
    const role = this.userData.role.toUpperCase();
    if (role === RoleName.ADMIN) {
      return this.language === LanguageOption.SPANISH ? RoleSpanishLabel.ADMIN : RoleEnglishLabel.ADMIN;
    }
    return this.language === LanguageOption.SPANISH ? RoleSpanishLabel.USER : RoleEnglishLabel.USER;
  }

  getLanguagePreferenceLabel(): string {
    return this.language === LanguageOption.SPANISH ? LanguageLabel.SPANISH : LanguageLabel.ENGLISH;
  }

  getHomeScreenLabel(): string {
    switch (this.userSettingsService.getHomeScreen()) {
      case HomeScreenOption.POKEMON_LIST:   return this.language === LanguageOption.SPANISH ? 'Lista de Pokémon' : 'Pokémon List';
      case HomeScreenOption.PROFILE:        return this.language === LanguageOption.SPANISH ? 'Perfil' : 'Profile';
      case HomeScreenOption.RANDOM_POKEMON:
      default:                              return this.language === LanguageOption.SPANISH ? 'Pokémon Aleatorio' : 'Random Pokémon';
    }
  }

  getPreferredSpriteLabel(): string {
    switch (this.userSettingsService.getPreferredSprite()) {
      case PreferredSpriteOption.GLOBAL_LINK: return 'Global Link';
      case PreferredSpriteOption.HOME:
      default:                                return 'Home';
    }
  }

  goToPokedex(): void {
    this.router.navigate(['/pokedex']);
  }

  onAvatarSaved(): void {
    this.avatarModalOpen = false;
  }

  logout(): void {
    this.loading = true;
    this.authService.logout();
    this.router.navigate(['/pokedex']);
  }

}
