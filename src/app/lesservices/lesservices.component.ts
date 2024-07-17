import { Component, OnInit } from '@angular/core';
import { ServiceService } from "../services/service.service";
import { JsonPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { Service } from "../model/service.model";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lesservices',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    JsonPipe,
    NgClass
  ],
  templateUrl: './lesservices.component.html',
  styleUrls: ['./lesservices.component.css']
})
export class LesservicesComponent implements OnInit {
  lesservices!: Array<Service>;
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  errorMessage!: String;
  searchFormGroup!: FormGroup;
  currentAction: string = "all";

  constructor(private serviceService: ServiceService, private fb: FormBuilder,
              public authService:AuthenticationService,private router:Router) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null)
    });
    this.handleGetPageServices();
  }

  handleGetPageServices() {
    this.serviceService.getPageLesservices(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.lesservices = data.services;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }

  handleGetAllServices() {
    this.serviceService.getAllLesservices().subscribe({
      next: (data) => {
        this.lesservices = data;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }

  handleDeleteService(s: Service) {
    let conf = confirm("Êtes-vous sûr de vouloir supprimer ce service?");
    if (!conf) return;
    this.serviceService.deleteService(s.id).subscribe({
      next: () => {
        let index = this.lesservices.indexOf(s);
        this.lesservices.splice(index, 1);
      },
      error: (err) => {
        this.errorMessage = err;
      }
    })
  }

  handleSearchServices() {
    this.currentAction = "search";
    this.currentPage = 0; // reset to page 0 for a new search
    let keyword = this.searchFormGroup.value.keyword;
    this.serviceService.searchServices(keyword, this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.lesservices = data.services;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    })
  }

  goToPage(i: number) {
    this.currentPage = i;
    if (this.currentAction === "all") {
      this.handleGetPageServices();
    } else {
      this.serviceService.searchServices(this.searchFormGroup.value.keyword, this.currentPage, this.pageSize).subscribe({
        next: (data) => {
          this.lesservices = data.services;
          this.totalPages = data.totalPages;
        },
        error: (err) => {
          this.errorMessage = err;
        }
      })
    }
  }

  handleNewService() {
    this.router.navigateByUrl("/admin/newService");
  }

  handleEditService(s: Service) {
    this.router.navigateByUrl("/admin/editService/"+s.id);
  }
}
