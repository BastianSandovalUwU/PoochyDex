import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-config-view',
  templateUrl: './config-view.component.html',
  styleUrls: ['./config-view.component.scss'],
  animations: [
    trigger('toggleFilters', [
      state('visible', style({
        height: '*',
        opacity: 1
      })),
      state('hidden', style({
        height: '0px',
        opacity: 0
      })),
      transition('visible <=> hidden', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ConfigViewComponent implements OnInit {
  @Input() language: string;
  @Output() changeView = new EventEmitter<string>();

  filtersVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  changeViewType(view: string) {
    this.changeView.emit(view);
  }

}
