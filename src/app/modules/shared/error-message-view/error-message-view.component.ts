import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorMessageService } from '../../../services/error-message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-message-view',
  templateUrl: './error-message-view.component.html'
})
export class ErrorMessageViewComponent implements OnInit, OnDestroy {
  message: string = '';
  systemErrorMessage: string = '';
  showMessage: boolean = false;
  private subscription: Subscription;

  constructor(private errorMessageService: ErrorMessageService) {
    this.subscription = this.errorMessageService.errorState$.subscribe(state => {
      this.message = state.message;
      this.systemErrorMessage = state.systemErrorMessage;
      this.showMessage = state.show;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  close() {
    this.errorMessageService.hideError();
  }
}
