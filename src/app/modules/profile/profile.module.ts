import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';
import { RouterModule } from '@angular/router';
import { profileRoute } from './profile.routing';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(profileRoute),
    NgxLoadingModule
  ],
  declarations: [
    ShowProfileComponent
  ]
})
export class ProfileModule { }
