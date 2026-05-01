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
    this.selectedHomeScreen = this.userSettingsService.getHomeScreen();
    this.selectedSprite = this.userSettingsService.getPreferredSprite();
    this.selectedLanguage = this.language;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  saveAll(): void {
    this.userSettingsService.setHomeScreen(this.selectedHomeScreen);
    this.userSettingsService.setPreferredSprite(this.selectedSprite);
    this.authService.setLanguage(this.selectedLanguage);
    this.saved = true;
    setTimeout(() => (this.saved = false), 2000);
  }
}
