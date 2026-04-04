import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudApiComponent } from './components/crud-api/crud-api.component';
import { poochyDexApiRoute } from './poochyDexApi.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(poochyDexApiRoute),
  ],
  declarations: [
    CrudApiComponent
  ]
})
export class PoochyDexApiModule { }
