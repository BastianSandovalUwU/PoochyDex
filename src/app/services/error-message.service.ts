import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ErrorMessage {
  message: string;
  systemErrorMessage: string;
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  private errorState = new BehaviorSubject<ErrorMessage>({
    message: '',
    systemErrorMessage: '',
    show: false
  });

  errorState$ = this.errorState.asObservable();

  showError(message: string, systemErrorMessage: string = '') {
    this.errorState.next({
      message,
      systemErrorMessage,
      show: true
    });
  }

  hideError() {
    this.errorState.next({
      message: '',
      systemErrorMessage: '',
      show: false
    });
  }
}
