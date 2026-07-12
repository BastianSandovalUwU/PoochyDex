import { Injectable, NgZone, inject } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, of } from 'rxjs';
import { mapTo, startWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private zone = inject(NgZone);

  private isOnlineSubject = new BehaviorSubject<boolean>(navigator.onLine);
  isOnline$ = this.isOnlineSubject.asObservable();

  constructor() {
    const online$ = fromEvent(window, 'online').pipe(mapTo(true));
    const offline$ = fromEvent(window, 'offline').pipe(mapTo(false));

    merge(online$, offline$, of(navigator.onLine))
      .pipe(startWith(navigator.onLine))
      .subscribe((status) => {
        this.zone.run(() => this.isOnlineSubject.next(status));
      });
  }
}


