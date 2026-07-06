import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';   // 🔥 ADD THIS
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ChangeJobStatus, PostedJob } from '../../Interface/employerModel';

@Component({
  selector: 'app-posted-jobs',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './posted-jobs.component.html',
  styleUrl: './posted-jobs.component.css'
})
export class PostedJobsComponent {

  //   jobs = [
  //   {
  //     title: 'Java Developer',
  //     experience: '2-4 Years',
  //     postDate: '10 Apr 2026',
  //     status: 'Open',
  //     applicants: 25
  //   },
  //   {
  //     title: 'Frontend Developer',
  //     experience: '1-3 Years',
  //     postDate: '8 Apr 2026',
  //     status: 'Paused',
  //     applicants: 12
  //   }
  // ];

    
  postedJobs: PostedJob[] = [];
   changeJobStatus: ChangeJobStatus = {
  
        jobId: 0,
        status: ''
      };
  
    constructor(
            private authService: AuthService,
            private router: Router
          ) {}
    
  
    ngOnInit(): void {
      this.loadPostedJobs();
    }

    trackByJob(_: number, job: PostedJob): number {
        return job.jobId;
    }
      
    
        
    loadPostedJobs() {
      this.authService.getPostedJobs(1).subscribe({
        next: (data:PostedJob[]) => {
  
          console.log("Complete Response:", data);
          console.log("Is Array:", Array.isArray(data));
  
          this.postedJobs = data;
  
          console.log("Applied Jobs:", this.postedJobs);
          
        },
          error: (err) => {
            console.error(err);
          }
        });
      } 

    

  updateJob(changeStatus: ChangeJobStatus) {
    console.log('Updating job:', changeStatus);


  }
    
      // onWithdraw(applicationId: number): void {
    
      //   if (!confirm('Are you sure you want to withdraw this application?')) {
      //     return;
      //   }
    
      //   this.authService.withdrawJobApplication(applicationId).subscribe({
    
      //     next: (response) => {
    
      //       alert('Application withdrawn successfully ✅');
    
      //       // Remove the withdrawn application from the list
      //       this.appliedJobs = this.appliedJobs.filter(
      //         job => job.applyid !== applicationId
      //       );
    
      //       console.log(response);
    
      //     },
    
      //     error: (err) => {
    
      //       console.error(err);
    
      //       if (err.error) {
      //         alert(err.error);
      //       } else {
      //         alert('Failed to withdraw application ❌');
      //       }
    
      //     }
    
      //   });
    
        // } 















}

