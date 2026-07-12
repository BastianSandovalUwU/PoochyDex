import { Component, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-theme-toggle',
    templateUrl: './theme-toggle.component.html',
    styleUrls: ['./theme-toggle.component.scss'],
    standalone: false
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  isDarkMode$: Observable<boolean>;

  constructor() {
    this.isDarkMode$ = this.themeService.isDarkMode$;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
