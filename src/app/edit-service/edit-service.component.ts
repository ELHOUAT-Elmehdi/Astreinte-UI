import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ServiceService} from "../services/service.service";
import {Service} from "../model/service.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent implements OnInit{
  serviceId!:string;
  service!:Service;
  serviceFormGroup!:FormGroup;
  constructor(private route:ActivatedRoute,public serviceService:ServiceService, private fb:FormBuilder) {
    this.serviceId=this.route.snapshot.params['id'];

  }
  ngOnInit() {
    this.serviceService.getService(this.serviceId).subscribe({
      next:(data)=>{
        this.service=data;
        this.serviceFormGroup=this.fb.group({
          nom : this.fb.control(this.service.nom,[Validators.required])
        });
        }
      ,error:(err)=>{
        console.log(err);
      }
    });
  }

  handleUpdateService() {
    let s=this.serviceFormGroup.value;
    s.id=this.service.id;
    this.serviceService.updateService(s).subscribe({
      next:(ser)=>{
        alert("Ce Service est modifie")
      },error:err=>{
        console.log(err);
      }
    });
  }
}
