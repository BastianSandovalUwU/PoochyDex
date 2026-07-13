import { Component, OnDestroy, inject, ChangeDetectionStrategy } from '@angular/core';
import { ErrorMessageService } from '../../../services/error-message.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-error-message-view',
    templateUrl: './error-message-view.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ErrorMessageViewComponent implements OnDestroy {
  private errorMessageService = inject(ErrorMessageService);

  message: string = '';
  systemErrorMessage: string = '';
  showMessage: boolean = false;
  private subscription: Subscription;

  constructor() {
    this.subscription = this.errorMessageService.errorState$.subscribe(state => {
      this.message = state.message;
      this.systemErrorMessage = state.systemErrorMessage;
      this.showMessage = state.show;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  close() {
    this.errorMessageService.hideError();
  }
}
