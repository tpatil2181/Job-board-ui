import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    skills: []
  };

  educationInput = '';
  skillInput = '';

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
      
    // 👉 call backend API here
  }
}
