import {CollaborateursComponent} from "../collaborateurs/collaborateurs.component";
import {PlanningComponent} from "../planning/planning.component";
import {ServiceService} from "../services/service.service";

export interface Service{
  id:string;
  nom:String;
  //collaborateurs:CollaborateursComponent;
  //planning:PlanningComponent;
}
export interface PageService{
  services:Service[];
  page : number;
  size : number;
  totalPages : number;
}
