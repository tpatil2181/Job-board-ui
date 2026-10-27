import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobApplication } from '../../Interface/Canditate/candidate';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Job, Company, Filters } from '../../Interface/models';
import { AlertService } from '../../services/alert.service.service';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  isLoggedIn = true;

  jobIdformList!: number;
  job: Job | null = null;

  candidateId: number = 0;

  // Demo

  // job: DemoJob = {
  //   jobTitle: 'Senior Software Engineer',
  //   employerName: 'Infosys',
  //   companyLogo: 'assets/images/infosys-logo.png',
  //   minExperience: 4,
  //   maxExperience: 8,
  //   minSalary: 1800000,
  //   maxSalary: 2400000,
  //   workMode: 'Hybrid',
  //   jobLocation: 'Bengaluru, Karnataka',
  //   datePosted: '2026-07-10',
  //   jobDescription: `We are looking for a Senior Software Engineer to join our core platform team.
  // You will design, build, and scale backend services that power millions of transactions
  // daily, working closely with product and design to ship reliable, well-tested features.`,
  //   jobResponsibilities: `Design and develop scalable backend services using Java and Spring Boot.
  // Collaborate with cross-functional teams to define, design, and ship new features.
  // Own code quality through unit testing, code reviews, and CI/CD best practices.
  // Mentor junior engineers and contribute to technical architecture decisions.`,
  //   jobQualifications: `Bachelor's degree in Computer Science or a related field.
  // 4+ years of experience building production backend systems.
  // Strong understanding of data structures, algorithms, and system design.
  // Experience with cloud platforms such as AWS or Azure is a plus.`,
  //   // skills: [
  //   { skillName: 'Java' },
  //   { skillName: 'Spring Boot' },
  //   { skillName: 'Microservices' },
  //   { skillName: 'SQL' },
  //   { skillName: 'AWS' },
  //   { skillName: 'System Design' }
  // ]
  // };




  // job: Job = {
  //   jobTitle: 'Senior Software Engineer',
  //   // employerName: this.job?.employerName || 'Infosys',
  //   // companyLogo: 'assets/images/infosys-logo.png',
  //   minExperience: 4,
  //   maxExperience: 8,
  //   minSalary: 0,
  //   maxSalary: 0,
  //   workMode: 'Hybrid',
  //   jobLocation: 'Bengaluru, Karnataka',
  //   datePosted: '2026-07-10',
  //   jobDescription: `We are looking for a Senior Software Engineer to join our core platform team.
  // You will design, build, and scale backend services that power millions of transactions
  // daily, working closely with product and design to ship reliable, well-tested features.`,
  // jobResponsibilities: `Design and develop scalable backend services using Java and Spring Boot.
  // Collaborate with cross-functional teams to define, design, and ship new features.
  // Own code quality through unit testing, code reviews, and CI/CD best practices.
  // Mentor junior engineers and contribute to technical architecture decisions.`,
  //   jobQualifications: `Bachelor's degree in Computer Science or a related field.
  // 4+ years of experience building production backend systems.
  // Strong understanding of data structures, algorithms, and system design.
  // Experience with cloud platforms such as AWS or Azure is a plus.`,
  // skills: [
  //   { skillName: 'Java' },
  //   { skillName: 'Spring Boot' },
  //   { skillName: 'Microservices' },
  //   { skillName: 'SQL' },
  //   { skillName: 'AWS' },
  //   { skillName: 'System Design' }
  // ]
  // };










  // Role: string | null = localStorage.getItem('role');
  // if (this.Role === 'null') {
  //   this.router.navigate(['login']);
  // };

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    

    this.authService.getJobById(id).subscribe(job => {
    this.job = job;
    this.loadEmployerLogo(this.job?.companyLogo);

 

    const candidate = JSON.parse(
    localStorage.getItem('candidate') || '{}'
  );

  this.candidateId = Number(candidate.candidateId) || 0;

     console.log('sending jobId:', this.job?.jobId);
    console.log('sending candidateId:', this.candidateId);

      this.isalreadyApplied();


  console.log('Candidate ID:', this.candidateId);

      // console.log(this.job);
    });
    // this.isalreadyApplied();
  }

  // applyJob(): void {}

  isApplied: boolean = false;


  applyJob(): void {
    const application: JobApplication = {

      jobId: this.job?.jobId || 0,
      employeerId: this.job?.employerId || 0,
      candidateId: this.candidateId || 0 
    };

    // console.log('Sending Data:', application);  //Remove this letter for security resone it is printing data on console

    this.authService.jobApplicationRequest(application).subscribe({
      next: (res) => {
        console.log(res);
        this.isApplied = true;
        this.alertService.success("Applied Successful ✅");
        // alert('Applied Successful ✅');
      },
      error: (err) => {
        console.error(err);

        if (err.error && err.error.message) {
          this.alertService.error(err.error.message);
        } else {
          this.alertService.error("Something went wrong");
          // alert('Something went wrong ❌');
        }
      }
    });
  }

  isalreadyApplied(): void{

    this.authService.isAlreadyApplied(this.job?.jobId || 0, this.candidateId).subscribe({
      next: (res) => {
        console.log('job application status:' + res);
        if (res) {
          this.isApplied = true;
        }
      }
    });
  }

  //----------------------------- load company logo-------------------------
  logoUrl: string | null = null;
  private logoObjectUrl: string | null = null;

  loadEmployerLogo(logoId: number | null | undefined): void {
    if (this.logoObjectUrl) {
      URL.revokeObjectURL(this.logoObjectUrl);
      this.logoObjectUrl = null;
    }

    this.logoUrl = null;

    if (!logoId) {
      return;
    }

    this.authService.getImageUrl(logoId).subscribe({
      next: (blob: Blob) => {
        this.logoObjectUrl = URL.createObjectURL(blob);
        this.logoUrl = this.logoObjectUrl;
      },
      error: (err) => {
        console.error('Failed to load employer logo:', err);
        this.logoUrl = null;
      }
    });
  }
}