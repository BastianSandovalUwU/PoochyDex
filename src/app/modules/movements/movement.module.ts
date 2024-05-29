import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { movementRoute } from "./movement.routing";
import { SharedModule } from "../shared/shared.module";
import { NgModule } from "@angular/core";
import { ShowMovementComponent } from './components/show-movement/show-movement.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(movementRoute),
    SharedModule
  ],
  declarations: [
    
  
    ShowMovementComponent
  ],
})
export class MovementModule { }
