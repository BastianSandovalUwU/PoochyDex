import { Component, Input, OnDestroy, OnInit, DestroyRef, inject } from '@angular/core';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  private destroyRef = inject(DestroyRef);
  @Input() loading: boolean = false;
  language = 'es';

  private readonly subs = new Subscription();

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.subs.add(
      this.languageService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(lang => {
        this.language = lang;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
