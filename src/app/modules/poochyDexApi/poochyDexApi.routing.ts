import { Route } from "@angular/router";
import { CrudApiComponent } from "./components/crud-api/crud-api.component";

export const poochyDexApiRoute: Route[] = [
  {
    path: '',
    component: CrudApiComponent
  }
];
