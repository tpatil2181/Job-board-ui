import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-applicant-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './applicant-list.component.html',
  styleUrl: './applicant-list.component.css'
})
export class ApplicantListComponent {

  // job: any = {};

  // applicants: any[] = [];
  job = {
    jobId: 101,
    jobTitle: 'Java Full Stack Developer',
    companyName: 'TechNova Solutions',
    jobLocation: 'Pune, Maharashtra',
    workMode: 'Hybrid',
    maxSalary: '12 LPA',
    experience: '2-5 Years'
  };

  applicants = [

    {
      applicationId: 1,
      candidateId: 11,
      firstName: 'Tushar',
      lastName: 'Patil',
      email: 'tushar@gmail.com',
      mobNo: '9876543210',
      applicationStatus: 'APPLIED'
    },

    {
      applicationId: 2,
      candidateId: 12,
      firstName: 'Rahul',
      lastName: 'Sharma',
      email: 'rahul.sharma@gmail.com',
      mobNo: '9876501234',
      applicationStatus: 'SHORTLISTED'
    },

    {
      applicationId: 3,
      candidateId: 13,
      firstName: 'Sneha',
      lastName: 'Joshi',
      email: 'sneha.joshi@gmail.com',
      mobNo: '9876512345',
      applicationStatus: 'INTERVIEW'
    },

    {
      applicationId: 4,
      candidateId: 14,
      firstName: 'Amit',
      lastName: 'Verma',
      email: 'amit.verma@gmail.com',
      mobNo: '9876523456',
      applicationStatus: 'REJECTED'
    },

    {
      applicationId: 5,
      candidateId: 15,
      firstName: 'Priya',
      lastName: 'Kulkarni',
      email: 'priya.kulkarni@gmail.com',
      mobNo: '9876534567',
      applicationStatus: 'APPLIED'
    },

    {
      applicationId: 6,
      candidateId: 16,
      firstName: 'Rohit',
      lastName: 'Mehta',
      email: 'rohit.mehta@gmail.com',
      mobNo: '9876545678',
      applicationStatus: 'SHORTLISTED'
    },

    {
      applicationId: 7,
      candidateId: 17,
      firstName: 'Neha',
      lastName: 'Gupta',
      email: 'neha.gupta@gmail.com',
      mobNo: '9876556789',
      applicationStatus: 'INTERVIEW'
    },

    {
      applicationId: 8,
      candidateId: 18,
      firstName: 'Akash',
      lastName: 'Singh',
      email: 'akash.singh@gmail.com',
      mobNo: '9876567890',
      applicationStatus: 'APPLIED'
    }

  ];

  ngOnInit(): void {

    this.loadJob();

    this.loadApplicants();

  }

  loadJob() {

    // API to fetch job details

  }

  loadApplicants() {

    // API to fetch applicants

  }

  // viewProfile(candidateId: number) {

  //     console.log(candidateId);

  // }

  // updateCandidateStatus(applicant: any) {

  //     console.log(applicant);

  // }

  viewProfile(candidateId: number): void {

    console.log('View Profile:', candidateId);

  }

  updateCandidateStatus(applicant: any): void {

    console.log('Updated Candidate:', applicant);

    alert(
      applicant.firstName +
      ' status updated to ' +
      applicant.applicationStatus
    );

  }


  // applicants = [
  //   {
  //     name: 'Rahul Sharma',
  //     status: 'Shortlisted'
  //   },
  //   {
  //     name: 'Anita Verma',
  //     status: 'Rejected'
  //   },
  //   {
  //     name: 'Amit Patil',
  //     status: 'Rejected'
  //   }
  // ];

  // viewProfile(applicant: any) {
  //   console.log('View profile:', applicant);
  //   // 👉 later navigate to profile page
  // }

  // updateApplicant(applicant: any) {
  //   console.log('Update applicant:', applicant);
  //   // 👉 call API here
  // }
}
