// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-all-applicant-wise-jobs',
//   standalone: true,
//   imports: [],
//   templateUrl: './all-applicant-wise-jobs.component.html',
//   styleUrl: './all-applicant-wise-jobs.component.css'
// })
// export class AllPostedJobComponent {

// }

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service.service';
import { ApplicantWiseJob, PostedJob } from '../../Interface/employerModel';
import { EnumFormatPipe } from '../../shared/pipes/enum-format.pipe';


@Component({
 selector: 'app-all-applicant-wise-jobs',
  standalone: true,
  imports: [CommonModule,FormsModule,EnumFormatPipe],
  templateUrl: './all-applicant-wise-jobs.component.html',
  styleUrl: './all-applicant-wise-jobs.component.css'
})
export class AllApplicantWiseJobsComponent {

  // constructor(private router: Router){}


  // This things should be there in applicant wise job component.ts file in java side and frontend side 
  // JobTitle: string = '';
  // jobId: number = 0;
  // Experience: string = '';
  // PostedDate: string = ''
  // salary: string = '';
  // noOfApplicants: number = 0;

  // jobs = [

  //   {
  //     jobId:101,
  //     jobTitle:'Java Full Stack Developer',
  //     companyName:'TechNova Pvt Ltd',
  //     jobLocation:'Pune',
  //     workMode:'Hybrid',
  //     maxSalary:'12 LPA',
  //     totalApplicants:23
  //   },

  //   {
  //     jobId:102,
  //     jobTitle:'Flutter Developer',
  //     companyName:'Infosys',
  //     jobLocation:'Bangalore',
  //     workMode:'Remote',
  //     maxSalary:'10 LPA',
  //     totalApplicants:15
  //   },

  //   {
  //     jobId:103,
  //     jobTitle:'Spring Boot Developer',
  //     companyName:'TCS',
  //     jobLocation:'Mumbai',
  //     workMode:'On Site',
  //     maxSalary:'14 LPA',
  //     totalApplicants:42
  //   },

  //   {
  //     jobId:104,
  //     jobTitle:'React Developer',
  //     companyName:'Wipro',
  //     jobLocation:'Hyderabad',
  //     workMode:'Hybrid',
  //     maxSalary:'11 LPA',
  //     totalApplicants:9
  //   }

  // ];

  selectedStatus: string = '';
  
    filteredPostedJob: any[] = [];
  
    filterJobListings(): void {
  
      if (!this.selectedStatus) {
  
        this.filteredPostedJob = [...this.PostedJob];
  
        return;
      }
  
      this.filteredPostedJob = this.PostedJob.filter(
        job => job.status === this.selectedStatus
      );
    }
      
    PostedJob: PostedJob[] = [];
    //  changeJobStatus: ChangeJobStatus = {
    
    //       jobId: 0,
    //       status: ''
    //     };
    
      constructor(
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService 
            ) {}
      
    
      ngOnInit(): void {
        this.loadPostedJob();
      }
  
      trackByJob(_: number, job: PostedJob): number {
          return job.jobId;
      }



       loadPostedJob() {
                this.authService.getPostedJobs(1).subscribe({
                  next: (data: PostedJob[]) => {
            
                    console.log("Complete Response:", data);
                    console.log("Is Array:", Array.isArray(data));
            
                    this.PostedJob = data;
            
                    this.filteredPostedJob = [...this.PostedJob];
            
                    console.log("Posted Jobs:", this.PostedJob);
            
                  },
                  error: (err) => {
                    console.error(err);
                  }
                });
      
              }
          
  // viewApplicants(jobId:number){

  //     // this.router.navigate(['/applicants',jobId]);
  //     this.router.navigate(['comapnyHome/allAllicantsofperticularjobd']);
      

  // }

   viewApplicants(jobId: number) {

    this.router.navigate(['/comapnyHome/allApplicants', jobId]);
  }

}