import {Component} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css']
})
export class Playground {
  applicants = [
    {
      name: 'Rahul Sharma',
      status: 'Shortlisted'
    },
    {
      name: 'Anita Verma',
      status: 'Rejected'
    },
    {
      name: 'Amit Patil',
      status: 'Rejected'
    }
  ];

  viewProfile(applicant: any) {
    console.log('View profile:', applicant);
    // 👉 later navigate to profile page
  }

  updateApplicant(applicant: any) {
    console.log('Update applicant:', applicant);
    // 👉 call API here
  }
}

bootstrapApplication(Playground);
