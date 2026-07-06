import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppliedJob } from '../../Interface/Canditate/candidate';

@Component({
  selector: 'app-applied-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent {

  
  appliedJobs: AppliedJob[] = [];

  constructor(
          private authService: AuthService,
          private router: Router
        ) {}
  

  ngOnInit(): void {
    this.loadAppliedJobs();
  }

  // onWithdraw(ApplyId: number) {
  //   alert('Withdrawing job application for Application id ' + ApplyId);

  //   // alert('Withdraw clicked for ' + job.jobTitle);
  // }

    trackByJob(_: number, job: AppliedJob): number {
      return job.applyid;
    }
  

    
  loadAppliedJobs() {
    this.authService.getAppliedJobs().subscribe({
      next: (data:AppliedJob[]) => {

        console.log("Complete Response:", data);
        console.log("Is Array:", Array.isArray(data));

        this.appliedJobs = data;

        console.log("Applied Jobs:", this.appliedJobs);
        
      },
        error: (err) => {
          console.error(err);
        }
      });
    } 

  onWithdraw(applicationId: number): void {

    if (!confirm('Are you sure you want to withdraw this application?')) {
      return;
    }

    this.authService.withdrawJobApplication(applicationId).subscribe({

      next: (response) => {

        alert('Application withdrawn successfully ✅');

        // Remove the withdrawn application from the list
        this.appliedJobs = this.appliedJobs.filter(
          job => job.applyid !== applicationId
        );

        console.log(response);

      },

      error: (err) => {

        console.error(err);

        if (err.error) {
          alert(err.error);
        } else {
          alert('Failed to withdraw application ❌');
        }

      }

    });

    } 
}

  




