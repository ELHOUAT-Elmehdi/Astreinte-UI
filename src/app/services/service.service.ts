import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageService, Service} from "../model/service.model";
import {UUID} from "angular2-uuid";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private services! : Array<Service>;
  constructor() {
    this.services=[
      {id:UUID.UUID(), nom :"Informatique"},
      {id:UUID.UUID(), nom :"Logistique"},
      {id:UUID.UUID(), nom :"Ressources Humaines"},
    ];
    for (let i = 0; i < 10; i++) {
      this.services.push({id:UUID.UUID(), nom :"Informatique"});
      this.services.push({id:UUID.UUID(), nom :"Logistique"});
      this.services.push({id:UUID.UUID(), nom :"Ressources Humaines"});
    }

  }

  public getAllLesservices() : Observable<Array<Service>>{
    /*let a=Math.random();
    if(a<0.5) return throwError(()=>new Error("Internet connexion error"));
    else return of(this.services);*/
    return of(this.services);
  }
  public deleteService(id:string) : Observable<boolean>{
    this.services=this.services.filter(s=>s.id!=id);
    return of(true);
  }
  public searchServices(key :string,page :number,size:number) : Observable<PageService>{
    let result=this.services.filter(s=>s.nom.includes(key));
    let index=page*size;
    let totalPages = ~~(result.length/size);
    if(this.services.length % size !=0)
      totalPages++;
    let pageServices=result.slice(index,index+size);
    return of({page:page, size:size, totalPages:totalPages,services:pageServices});
  }
  public getPageLesservices(page : number, size : number) : Observable<PageService>{
    let index=page*size;
    let totalPages = ~~(this.services.length/size);
    if(this.services.length % size !=0)
      totalPages++;
    let pageServices=this.services.slice(index,index+size);
    return of({page:page, size:size, totalPages:totalPages,services:pageServices});
  }
  public addNewService(service:Service):Observable<Service>{
    service.id=UUID.UUID();

    this.services.push(service);
    return of(service);
  }
  public getService(id:string):Observable<Service>{
    let a= this.services.find(s=>s.id==id);
    if(a==undefined) return throwError(()=>new Error("Le service n'est pas trouve"));
    return of(a);
  }

  public updateService(service:Service):Observable<Service>{
    this.services=this.services.map(s=>(s.id==service.id)?service:s);
    return of(service);
  }
}



