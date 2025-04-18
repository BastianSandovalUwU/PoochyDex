import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-new-update-view',
  templateUrl: './new-update-view.component.html',
  styleUrls: ['./new-update-view.component.scss']
})
export class NewUpdateViewComponent {

  showMessage = false;

  constructor(
    private updates: SwUpdate,
  ) {
    if (this.updates.isEnabled) {
      this.updates.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
          this.showMessage = true;
        }
      });
    }
  }

  ngOnInit() {
  }

  updateApp() {
    this.showMessage = false;
    window.location.reload();
  }

}
