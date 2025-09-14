import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'poochydex-theme';
  private isDarkTheme = new BehaviorSubject<boolean>(false);

  constructor() {
    // Check for saved theme preference or default to light theme
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shouldUseDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    this.setTheme(shouldUseDark);
  }

  get isDarkMode$() {
    return this.isDarkTheme.asObservable();
  }

  get isDarkMode() {
    return this.isDarkTheme.value;
  }

  toggleTheme() {
    this.setTheme(!this.isDarkTheme.value);
  }

  setTheme(isDark: boolean) {
    this.isDarkTheme.next(isDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(this.THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(this.THEME_KEY, 'light');
    }
  }
}
