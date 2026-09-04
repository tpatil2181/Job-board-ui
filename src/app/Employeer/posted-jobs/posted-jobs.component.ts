import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';   // 🔥 ADD THIS
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeJobStatus, PostedJob } from '../../Interface/employerModel';
import { AlertService } from '../../services/alert.service.service';
import { EnumFormatPipe } from '../../shared/pipes/enum-format.pipe';
import { DateFormatePipePipe } from '../../shared/pipes/date-formate-pipe.pipe';

@Component({
  selector: 'app-posted-jobs',
  standalone: true,
  imports: [FormsModule, CommonModule,DateFormatePipePipe,EnumFormatPipe],
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


  selectedStatus: string = '';

  filteredPostedJobs: any[] = [];

  filterPostedJobs(): void {

    if (!this.selectedStatus) {

      this.filteredPostedJobs = [...this.postedJobs];

      return;
    }

    this.filteredPostedJobs = this.postedJobs.filter(
      job => job.status === this.selectedStatus
    );
  }
    
  postedJobs: PostedJob[] = [];
   changeJobStatus: ChangeJobStatus = {
  
        jobId: 0,
        status: ''
      };
  
    constructor(
            private authService: AuthService,
            private router: Router,
            private route: ActivatedRoute,
            private alertService: AlertService
          ) {}
    
  
    ngOnInit(): void {
      this.loadPostedJobs();
    }

    trackByJob(_: number, job: PostedJob): number {
        return job.jobId;
    }
      
    
        
    // loadPostedJobs() {
    //   this.authService.getPostedJobs(1).subscribe({
    //     next: (data:PostedJob[]) => {
  
    //       console.log("Complete Response:", data);
    //       console.log("Is Array:", Array.isArray(data));
  
    //       this.postedJobs = data;
  
    //       console.log("Applied Jobs:", this.postedJobs);
          
    //     },
    //       error: (err) => {
    //         console.error(err);
    //       }
    //     });
    //   } 

       loadPostedJobs() {
          this.authService.getPostedJobs(1).subscribe({
            next: (data: PostedJob[]) => {
      
              console.log("Complete Response:", data);
              console.log("Is Array:", Array.isArray(data));
      
              this.postedJobs = data;
      
              this.filteredPostedJobs = [...this.postedJobs];
      
              console.log("Posted Jobs:", this.postedJobs);
      
            },
            error: (err) => {
              console.error(err);
            }
          });

        }
    

  updateJob(jobid: number, status: string) {
    this.changeJobStatus.jobId = jobid;
    this.changeJobStatus.status = status;
    // console.log('Updating job:', changeStatus);



    // console.log('Job Posted:', this.job);
     this.authService.updateJobStatus(this.changeJobStatus).subscribe({
      next: (res) => {
        console.log(res);
         this.alertService.success("Job Status Updated Successful ✅");
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
    // changeStatus
    // console.log('Updating job:', changeStatus);


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

