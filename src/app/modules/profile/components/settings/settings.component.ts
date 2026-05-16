import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';
import { UserSettingsService } from '../../../shared/services/user-settings.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { HomeScreenOption, PreferredSpriteOption } from '../../../../../../entities/common/enum';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  language = 'es';

  readonly HomeScreenOption = HomeScreenOption;
  readonly PreferredSpriteOption = PreferredSpriteOption;

  selectedHomeScreen: HomeScreenOption;
  selectedSprite: PreferredSpriteOption;

  saved = false;

  private readonly subs = new Subscription();

  selectedLanguage: string;

  constructor(
    private languageService: LanguageService,
    private userSettingsService: UserSettingsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.languageService.currentLanguage$.subscribe((lang) => {
        this.language = lang;
      })
    );
    const config = this.authService.getUserConfigData();
    this.selectedHomeScreen = (config?.home_screen as HomeScreenOption) ?? this.userSettingsService.getHomeScreen();
    this.selectedSprite = (config?.preferred_sprite as PreferredSpriteOption) ?? this.userSettingsService.getPreferredSprite();
    this.selectedLanguage = config?.language ?? this.language;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  saveAll(): void {
    this.authService.updateUserConfig(this.selectedLanguage, this.selectedSprite, this.selectedHomeScreen).subscribe({
      next: () => {
        this.saved = true;
        setTimeout(() => (this.saved = false), 2000);
      }
    });
  }
}
