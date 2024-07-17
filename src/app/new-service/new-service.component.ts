import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ServiceService} from "../services/service.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-new-service',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './new-service.component.html',
  styleUrl: './new-service.component.css'
})
export class NewServiceComponent implements OnInit{
  serviceFormGroup!:FormGroup;
  constructor(private fb:FormBuilder,private servService:ServiceService) {
  }
  ngOnInit() {
    this.serviceFormGroup=this.fb.group({
      nom : this.fb.control(null,[Validators.required])
    });
  }
  handleAddService() {
    let service=this.serviceFormGroup.value;
    this.servService.addNewService(service).subscribe({
      next:(data)=>{
        alert("Le service est ajoute avec succes");
        this.serviceFormGroup.reset();
      },error:err=>{
        console.log(err);
      }
    });
  }
}
