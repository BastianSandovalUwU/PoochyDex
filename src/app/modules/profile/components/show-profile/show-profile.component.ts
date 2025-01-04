import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { UserData } from '../../../../../../entities/auth/user.entity';
import { Router } from '@angular/router';
import { LanguageService } from 'app/modules/shared/services/language.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit {

  useData: UserData
  loading: boolean = false;
  language: string;

  constructor(private authService: AuthService,
              private router: Router,
              private languageService: LanguageService) { }

  ngOnInit() {
    this.useData = this.authService.getSessionData();
    this.getLanguage();
    this.getUserConfigs();
    if(!this.useData) {
      console.log('no hay una sesión iniciada');
      this.router.navigate(['/auth/login']);
      return;
    }
  }

  getLanguage() {
    this.languageService.currentLanguage$.subscribe(language => {
      this.language = language;
    });
  }

  getUserConfigs() {
    this.authService.getUserConfigs().subscribe((data) => {
      this.authService.setUserConfigData(data.config);
      this.authService.setLanguage(data.config.language);
    });
  }

  logout() {
    this.loading = true;
    this.authService.logout();
  }

}
