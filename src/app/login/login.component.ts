import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userFormGroup! : FormGroup;
  errorMessage:any;
  constructor(private fb:FormBuilder, private authService:AuthenticationService, private router:Router) {
  }
  ngOnInit() : void{
    this.userFormGroup=this.fb.group({
      username:this.fb.control(""),
      password :this.fb.control(""),
    });
  }

  handleLogin() {
    let username=this.userFormGroup.value.username;
    let password=this.userFormGroup.value.password;
    this.authService.login(username,password).subscribe({
      next:(appUser)=>{
        this.authService.authenticateUser(appUser).subscribe({
          next:(data)=>{
            this.router.navigateByUrl("/admin");
          }
        });
      },
      error:(err)=>{
        this.errorMessage=err;
      }
    });

  }
}
