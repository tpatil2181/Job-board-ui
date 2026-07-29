import { CommonModule } from '@angular/common';
import { Component  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobApplication } from '../../Interface/Canditate/candidate';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Job, Company, Filters } from '../../Interface/models';

export interface DemoJob {
  jobTitle: string;
  employerName: string;
  companyLogo?: string;
  minExperience: number;
  maxExperience: number;
  minSalary?: number;
  maxSalary?: number;
  workMode: string;
  jobLocation: string;
  datePosted?: string | Date;
  jobDescription: string;
  jobResponsibilities?: string;
  jobQualifications?: string;
  // skills: DemoJobSkill[];
}


@Component({
  selector: 'app-job-description',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css'
})
export class JobDescriptionComponent {

  // Demo

job: DemoJob = {
  jobTitle: 'Senior Software Engineer',
  employerName: 'Infosys',
  companyLogo: 'assets/images/infosys-logo.png',
  minExperience: 4,
  maxExperience: 8,
  minSalary: 1800000,
  maxSalary: 2400000,
  workMode: 'Hybrid',
  jobLocation: 'Bengaluru, Karnataka',
  datePosted: '2026-07-10',
  jobDescription: `We are looking for a Senior Software Engineer to join our core platform team.
You will design, build, and scale backend services that power millions of transactions
daily, working closely with product and design to ship reliable, well-tested features.`,
  jobResponsibilities: `Design and develop scalable backend services using Java and Spring Boot.
Collaborate with cross-functional teams to define, design, and ship new features.
Own code quality through unit testing, code reviews, and CI/CD best practices.
Mentor junior engineers and contribute to technical architecture decisions.`,
  jobQualifications: `Bachelor's degree in Computer Science or a related field.
4+ years of experience building production backend systems.
Strong understanding of data structures, algorithms, and system design.
Experience with cloud platforms such as AWS or Azure is a plus.`,
  // skills: [
  //   { skillName: 'Java' },
  //   { skillName: 'Spring Boot' },
  //   { skillName: 'Microservices' },
  //   { skillName: 'SQL' },
  //   { skillName: 'AWS' },
  //   { skillName: 'System Design' }
  // ]
};
 



    isLoggedIn = true; 

    jobIdformList!: number;
    Ojob: Job | null = null;



    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
      ) {}

       // Role: string | null = localStorage.getItem('role');
    // if (this.Role === 'null') {
    //   this.router.navigate(['login']);
    // };

  //   ngOnInit() {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));

  //   this.authService.getJobById(id).subscribe(job  => {
  //       this.job = job;
  //       // console.log(this.job);
  //   });
  // }

  applyJob(): void {}


  // applyJob(): void {
  //    const application: JobApplication = {

  //       jobId:this.job?.jobId || 0,
  //       employeerId: this.job?.employerId || 0,
  //       candidateId: Number(localStorage.getItem('userId')) || 0
  //     };

  //   // console.log('Sending Data:', application);  //Remove this letter for security resone it is printing data on console

  //   this.authService.jobApplicationRequest(application).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       alert('Applied Successful ✅');
  //     },
  //     error: (err) => {
  //       console.error(err);
        
  //       if (err.error && err.error.message) {
  //         alert(err.error.message);
  //       } else {
  //         alert('Something went wrong ❌');
  //       }
  //     }
  //   });
  // }
}