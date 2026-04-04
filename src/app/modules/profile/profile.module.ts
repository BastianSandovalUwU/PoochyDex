import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';
import { SettingsComponent } from './components/settings/settings.component';
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
    SettingsComponent
  ]
})
export class ProfileModule { }
