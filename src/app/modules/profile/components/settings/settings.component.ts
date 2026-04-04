import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  language = 'es';
  seletectedView: string;
  mainViewsOptions: string[] = ['Pokemon List', 'Random Pokemon'];

  private readonly subs = new Subscription();

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.subs.add(
      this.languageService.currentLanguage$.subscribe((lang) => {
        this.language = lang;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
