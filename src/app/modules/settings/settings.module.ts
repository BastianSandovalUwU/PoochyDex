import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';
import { settingsRoutes } from './settings.routing';
import { VisualSettingsComponent } from './components/visual-settings/visual-settings.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(settingsRoutes),
    SharedModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    SettingsComponent,
    VisualSettingsComponent
  ]
})
export class SettingsModule { }
