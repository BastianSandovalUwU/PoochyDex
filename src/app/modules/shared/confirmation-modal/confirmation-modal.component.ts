import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() language: string;
  @Input() showConfirmDialog: boolean;
  @Input() title: string;
  @Input() description: string;
  @Output() confirmClearCacheRequested = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  cancelClearCache() {
    this.showConfirmDialog = false;
  }

  confirmClearCache() {
    this.confirmClearCacheRequested.emit();
    this.showConfirmDialog = false;
  }
}
