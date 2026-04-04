import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';
import { VisualSettingsComponent } from './components/visual-settings/visual-settings.component';
import { RouterModule } from '@angular/router';
import { profileRoute } from './profile.routing';
import { NgxLoadingModule } from 'ngx-loading';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(profileRoute),
    NgxLoadingModule,
    SharedModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    ShowProfileComponent,
    VisualSettingsComponent
  ]
})
export class ProfileModule { }
