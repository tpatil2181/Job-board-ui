import { CommonModule } from '@angular/common';
import { Component  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobApplication } from '../../Interface/Canditate/candidate';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Job, Company, Filters } from '../../Interface/models';



@Component({
  selector: 'app-job-description',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css'
})
export class JobDescriptionComponent {
    isLoggedIn = true; 
    jobIdformList!: number;
    job: Job | null = null;



    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
      ) {}

    ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.authService.getJobById(id).subscribe(job  => {
        this.job = job;
        // console.log(this.job);
    });
  }

  applyJob(): void {
     const application: JobApplication = {

        jobId:this.job?.jobId || 0,
        employeerId: this.job?.employerId || 0,
        candidateId: Number(localStorage.getItem('userId')) || 0
      };

    // console.log('Sending Data:', application);  //Remove this letter for security resone it is printing data on console

    this.authService.jobApplicationRequest(application).subscribe({
      next: (res) => {
        console.log(res);
        alert('Applied Successful ✅');
      },
      error: (err) => {
        console.error(err);
        
        if (err.error && err.error.message) {
          alert(err.error.message);
        } else {
          alert('Something went wrong ❌');
        }
      }
    });
  }
}