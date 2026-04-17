import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';   // 🔥 ADD THIS

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],  // 🔥 include here
  templateUrl: 'posted-job.component.html',
  styleUrls: ['posted-job.component.css']
})
export class Playground {

  jobs = [
    {
      title: 'Java Developer',
      experience: '2-4 Years',
      postDate: '10 Apr 2026',
      status: 'Open',
      applicants: 25
    },
    {
      title: 'Frontend Developer',
      experience: '1-3 Years',
      postDate: '8 Apr 2026',
      status: 'Paused',
      applicants: 12
    }
  ];

  updateJob(job: any) {
    console.log('Updating job:', job);
  }
}

bootstrapApplication(Playground);