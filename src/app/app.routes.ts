import { Routes } from '@angular/router';

import {LesservicesComponent} from "./lesservices/lesservices.component";
import {CollaborateursComponent} from "./collaborateurs/collaborateurs.component";
import {PlanningComponent} from "./planning/planning.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {authenticationGuard} from "./guards/authentication.guard";
import {NewServiceComponent} from "./new-service/new-service.component";
import {EditServiceComponent} from "./edit-service/edit-service.component";

export const routes: Routes = [
  {path :"login", component:LoginComponent},
  {path :"", component:LoginComponent},
  {path :"admin", component:AdminTemplateComponent,canActivate:[authenticationGuard], children: [
      {path :"lesservices", component:LesservicesComponent},
      {path :"collaborateurs", component:CollaborateursComponent},
      {path :"planning", component:PlanningComponent},
      {path :"newService", component:NewServiceComponent},
      {path :"editService/:id", component:EditServiceComponent},
    ]},
  {path :"planning", component:PlanningComponent}
];
