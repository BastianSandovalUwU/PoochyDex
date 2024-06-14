import { Route } from "@angular/router";
import { ShowMovementComponent } from "./components/show-movement/show-movement.component";

export const movementRoute: Route[] = [
    {
        path: 'show-movement/:id',
        component: ShowMovementComponent
    }
  ]
