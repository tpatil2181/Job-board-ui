import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports:[FormsModule, CommonModule],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css'
})
export class PostJobComponent {
  job: any = {
    jobTitle: '',
    company: '',
    location: '',
    experience: '',
    workmode: '',
    openings: '',
    salaryFrom: '',
    salaryTo: '',
    description: '',
    role: '',
    department: '',
    industry: '',
    employmentType: '',
    roleCategory: '',
    education: [],
    skills: [],
    dateTimestampProvider: new Date().toISOString().slice(0, 19)
  };

  educationInput = '';
  skillInput = '';


    constructor(
          private authService: AuthService,
          private router: Router,
          private route: ActivatedRoute,
          private alertService: AlertService
        ) {}

  addEducation() {
    if (this.educationInput.trim()) {
      this.job.education.push(this.educationInput.trim());
      this.educationInput = '';
    }
  }

  addSkill() {
    if (this.skillInput.trim()) {
      this.job.skills.push(this.skillInput.trim());
      this.skillInput = '';
    }
  }

  submitJob() {
    console.log('Job Posted:', this.job);
     this.authService.postJob(this.job).subscribe({
      next: (res) => {
        console.log(res);
         this.alertService.success("Job Posted Successful ✅");
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
    // 👉 call backend API here
  }
}
