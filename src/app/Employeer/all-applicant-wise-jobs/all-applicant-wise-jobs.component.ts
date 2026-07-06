// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-all-applicant-wise-jobs',
//   standalone: true,
//   imports: [],
//   templateUrl: './all-applicant-wise-jobs.component.html',
//   styleUrl: './all-applicant-wise-jobs.component.css'
// })
// export class AllApplicantWiseJobsComponent {

// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
 selector: 'app-all-applicant-wise-jobs',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './all-applicant-wise-jobs.component.html',
  styleUrl: './all-applicant-wise-jobs.component.css'
})
export class AllApplicantWiseJobsComponent {

  constructor(private router: Router){}

  jobs = [

    {
      jobId:101,
      jobTitle:'Java Full Stack Developer',
      companyName:'TechNova Pvt Ltd',
      jobLocation:'Pune',
      workMode:'Hybrid',
      maxSalary:'12 LPA',
      totalApplicants:23
    },

    {
      jobId:102,
      jobTitle:'Flutter Developer',
      companyName:'Infosys',
      jobLocation:'Bangalore',
      workMode:'Remote',
      maxSalary:'10 LPA',
      totalApplicants:15
    },

    {
      jobId:103,
      jobTitle:'Spring Boot Developer',
      companyName:'TCS',
      jobLocation:'Mumbai',
      workMode:'On Site',
      maxSalary:'14 LPA',
      totalApplicants:42
    },

    {
      jobId:104,
      jobTitle:'React Developer',
      companyName:'Wipro',
      jobLocation:'Hyderabad',
      workMode:'Hybrid',
      maxSalary:'11 LPA',
      totalApplicants:9
    }

  ];

  viewApplicants(jobId:number){

      // this.router.navigate(['/applicants',jobId]);
      this.router.navigate(['/allAllicantsofperticularjobd']);
      

  }

}