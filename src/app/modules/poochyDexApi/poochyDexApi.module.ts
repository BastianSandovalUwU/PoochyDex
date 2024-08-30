import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudApiComponent } from './components/crud-api/crud-api.component';
import { poochyDexApiRoute } from './poochyDexApi.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(poochyDexApiRoute),
  ],
  declarations: [
    CrudApiComponent
  ]
})
export class PoochyDexApiModule { }
