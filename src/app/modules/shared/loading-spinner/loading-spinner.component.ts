import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() loading: boolean = false;
  @Input() isCacheLoading: boolean = false;
  cacheProgress: number = 0;

  constructor(private helperService: HelperService) {}

  ngOnInit() {
    this.helperService.cacheLoadingProgress$.subscribe(progress => {
      this.cacheProgress = progress;
    });
  }
}
