import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppliedJob } from '../../Interface/Canditate/candidate';
import { SharedModule } from '../../pages/shared.module';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { AlertService } from '../../services/alert.service.service';
import { DateFormatePipePipe } from '../../shared/pipes/date-formate-pipe.pipe';
import { EnumFormatPipe } from '../../shared/pipes/enum-format.pipe';

@Component({
  selector: 'app-applied-jobs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DateFormatePipePipe,
    EnumFormatPipe
  ],
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent {


  appliedJobs: AppliedJob[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private alertService: AlertService
  ) { }


  ngOnInit(): void {
    this.loadAppliedJobs();
  }

  selectedStatus: string = '';

  filteredAppliedJobs: any[] = [];


  filterAppliedJobs(): void {

    if (!this.selectedStatus) {

      this.filteredAppliedJobs = [...this.appliedJobs];

      return;
    }

    this.filteredAppliedJobs = this.appliedJobs.filter(
      job => job.status === this.selectedStatus
    );
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
      next: (data: AppliedJob[]) => {

        console.log("Complete Response:", data);
        console.log("Is Array:", Array.isArray(data));

        this.appliedJobs = data;

        this.filteredAppliedJobs = [...this.appliedJobs];

        console.log("Applied Jobs:", this.appliedJobs);

      },
      error: (err) => {
        console.error(err);
      }
    });
  }




  onWithdraw(applicationId: number): void {

    this.confirmDialogService.confirm({

      title: 'Withdraw Application',

      message: 'Are you sure you want to withdraw this application?',

      variant: 'danger',

      confirmLabel: 'Withdraw',

      cancelLabel: 'Cancel'

    }).subscribe(result => {

      if (!result) {
        return;
      }

      this.authService.withdrawJobApplication(applicationId).subscribe({

        next: (response) => {

          this.alertService.success(
            'Application withdrawn successfully.'
          );

          // Remove the withdrawn application from the list
          this.appliedJobs = this.appliedJobs.filter(
            job => job.applyid !== applicationId
          );

          this.filteredAppliedJobs = this.filteredAppliedJobs.filter(
            job => job.applyid !== applicationId
          );

          console.log(response);

        },

        error: (err) => {

          console.error(err);

          if (err.error) {

            this.alertService.error(err.error);

          } else {

            this.alertService.error(
              'Failed to withdraw application.'
            );

          }

        }

      });

    });

  }
}





