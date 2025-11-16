import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudApiComponent } from './components/crud-api/crud-api.component';
import { poochyDexApiRoute } from './poochyDexApi.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(poochyDexApiRoute),
  ],
  declarations: [
    CrudApiComponent
  ]
})
export class PoochyDexApiModule { }
