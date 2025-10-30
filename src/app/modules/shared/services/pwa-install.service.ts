import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

@Injectable({ providedIn: 'root' })
export class PwaInstallService {
  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private canInstallSubject = new BehaviorSubject<boolean>(false);
  canInstall$ = this.canInstallSubject.asObservable();

  constructor(private zone: NgZone) {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.zone.run(() => {
        this.deferredPrompt = e as BeforeInstallPromptEvent;
        this.canInstallSubject.next(true);
      });
    });

    window.addEventListener('appinstalled', () => {
      this.zone.run(() => {
        this.deferredPrompt = null;
        this.canInstallSubject.next(false);
      });
    });
  }

  async promptInstall(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
    if (!this.deferredPrompt) return 'unavailable';
    try {
      await this.deferredPrompt.prompt();
      const choice = await this.deferredPrompt.userChoice;
      this.deferredPrompt = null;
      this.canInstallSubject.next(false);
      return choice.outcome;
    } catch {
      return 'dismissed';
    }
  }
}


