import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-visual-settings',
  templateUrl: './visual-settings.component.html',
  styleUrls: ['./visual-settings.component.scss']
})
export class VisualSettingsComponent implements OnInit {
  @Input() language: string;
  seletectedView: string;
  mainViewsOptions: string[] = ['Pokemon List', 'Random Pokemon'];

  constructor() { }

  ngOnInit() {
  }

}
