import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service.service';
import { AuthService } from '../../services/auth.service';
// import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
// import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";

import { SharedModule } from "../../pages/shared.module";
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { DateFormatePipePipe } from '../../shared/pipes/date-formate-pipe.pipe';
import { ChangeCandidateStatus } from '../../Interface/employerModel';


// =====================================================
// Applicant Interface
// =====================================================

export type ApplicationStatus = 'APPLIED' | 'SHORTLISTED' | 'INTERVIEWSCHEDULED' | 'SELECTED'| 'REJECTED';

export interface jobApplicant {

  applyid: number;

  employeerId:number;

  jobId: number;

  cndId: number;

  cndFname: string;

  cndLname: string;

  candidateEmail?: string;

  candidateTitle?: string | null;

  resumeId?: number | null;

  imageId?: number | null;

  dateApplied: string;

  status: ApplicationStatus;

}


// =====================================================
// Component
// =====================================================

@Component({
  selector: 'app-applicant-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DateFormatePipePipe
],
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css']
})
export class ApplicantListComponent implements OnInit {


  // =====================================================
  // Inputs
  // =====================================================

  // Job this list belongs to — pass in directly, or it will
  // be read from the route param `jobId` if not provided.
  // @Input() jobId?: number;

  jobTitle = '';

  


  // =====================================================
  // State
  // =====================================================

  applicants: jobApplicant[] = [];

  loading = false;

  searchTerm = '';

  statusFilter = '';

  readonly statusOptions: ApplicationStatus[] = [
    'APPLIED',
    'SHORTLISTED',
    'INTERVIEWSCHEDULED',
    'SELECTED',
    'REJECTED'
  ];

  // Tracks which row's status dropdown is open (for the
  // inline "Update Status" action menu)
  openMenuFor: number | null = null;


  // =====================================================
  // Constructor
  // =====================================================
jobId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,      // replace with your real AuthService type
    private alertService: AlertService,     // replace with your real AlertService type
    private confirmDialogService: ConfirmDialogService // replace with your real ConfirmDialogService type
  ) {}


  // =====================================================
  // Lifecycle
  // =====================================================

  // ngOnInit(): void {

  //   if (!this.jobId) {

  //     const paramId = this.route.snapshot.paramMap.get('jobId');
  //     this.jobId = paramId ? Number(paramId) : undefined;

  //   }

  //   this.loadApplicants();

  // }
  ngOnInit(): void {

  this.jobId = Number(this.route.snapshot.paramMap.get('jobId'));

  console.log('Job ID:', this.jobId);

  this.loadApplicants();
}

loadApplicants(): void {

  this.loading = true;

  this.authService.getApplicantsForJob(this.jobId)
    .subscribe({

      next: (response: any) => {

        console.log('Applicants response:', response);

        this.applicants = response.applicants ?? response;
        this.jobTitle = response.jobTitle ?? this.jobTitle;

        this.loading = false;
      },

      error: (err: any) => {

        console.error('Error loading applicants:', err);

        this.loading = false;

        this.alertService.error(
          err?.error?.message ||
          'Failed to load applicants.'
        );
      }

    });
}
  


  // =====================================================
  // Load applicants for this job
  // =====================================================

  // loadApplicants(): void {

  //   if (!this.jobId) {
  //     return;
  //   }

  //   this.loading = true;

  //   // this.authService
  //   //   .getApplicantsForJob(this.jobId, {
  //   //     status: this.statusFilter || null,
  //   //     search: this.searchTerm || null
  //   //   })
  //   this.authService.getApplicantsForJob(this.jobId,)
  //     .subscribe({

  //       next: (response: any) => {

  //         this.applicants = response.applicants ?? response;
  //         this.jobTitle = response.jobTitle ?? this.jobTitle;
  //         this.loading = false;

  //       },

  //       error: (err: any) => {

  //         console.error('Error loading applicants:', err);

  //         this.loading = false;

  //         this.alertService.error(
  //           err?.error?.message ||
  //           'Failed to load applicants.'
  //         );

  //       }

  //     });

  // }


  // =====================================================
  // Filter bar actions
  // =====================================================

  onSearch(): void {

    this.loadApplicants();

  }

  onReset(): void {

    this.searchTerm = '';
    this.statusFilter = '';

    this.loadApplicants();

  }


  // =====================================================
  // Row helpers
  // =====================================================

  trackByApplication(_index: number, applicant: jobApplicant): number {

    return applicant.applyid;

  }

  initials(name: string): string {

    return (name || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase())
      .join('');

  }

  // statusClass(status: ApplicationStatus): string {

  //   switch (status) {

  //     case 'Shortlisted':
  //       return 'status-SHORTLISTED';

  //     case 'Rejected':
  //       return 'status-REJECTED';

  //     case 'Scheduled':
  //       return 'status-SCHEDULED';

  //     default:
  //       return 'status-APPLIED';

  //   }

  // }


  // =====================================================
  // View resume / profile
  // =====================================================

  viewCndProfileEmplrView() {
      this.authService.viewCndProfileEmplrView().subscribe({
        next: (data: []) => {
  
          // console.log("Complete Response:", data);
          // console.log("Is Array:", Array.isArray(data));
  
          // this.appliedJobs = data;
  
          // this.filteredAppliedJobs = [...this.appliedJobs];
  
          // console.log("Applied Jobs:", this.appliedJobs);
  
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

  // viewResume(resumeId: number): void {

  //   if (resumeId==null) {

  //     this.alertService.error('This candidate has not uploaded a resume.');
  //     return;

  //   }

  //   window.open(`/api/resumes/${applicant.resumeId}`, '_blank');

  // }

  viewResume(resumeId: number): void {
    if (resumeId==null || resumeId===0) {
      console.error('Resume ID is missing ❌');
      alert('Resume not available');
      return;
    }
    this.authService.getResume(resumeId).subscribe({
      next: (res: Blob) => {
        const fileURL = window.URL.createObjectURL(res);
        window.open(fileURL); // ✅ opens PDF
      },
      error: (err) => {
        console.error(err);
        alert('Failed to load resume ❌');
      }
    });
  }

  viewProfile(cndId: number): void {

    this.router.navigate(['/employer/candidate', cndId]);

  }


  // =====================================================
  // Update status
  // =====================================================

  toggleStatusMenu(applicationId: number): void {
  this.openMenuFor =
    this.openMenuFor === applicationId ? null : applicationId;
}

updateStatus(
  appid: number,
  newStatus: ApplicationStatus
): void {

  this.openMenuFor = null;

  const request: ChangeCandidateStatus = {
    applyid: appid,
    status: newStatus
  };

  this.authService.updateApplicationStatus(request).subscribe({

    next: (response: any) => {
      console.log('Application status updated:', response);

      this.alertService.success(`Marked as ${newStatus}.`);
    },

    error: (err: any) => {
      console.error('Error updating status:', err);

      // Roll back if the API request fails
      // applicant.status = previousStatus;

      this.alertService.error(
        err?.error?.message || 'Failed to update status.'
      );
    }

  });
}

  // updateStatus(applicant: jobApplicant, newStatus: ApplicationStatus): void {

  //   this.openMenuFor = null;

  //   if (applicant.status === newStatus) {
  //     return;
  //   }

  //   const proceed = () => {

  //     const previousStatus = applicant.status;
  //     applicant.status = newStatus; // optimistic update

  //     this.authService
  //       .updateApplicationStatus(applicant.applyid, newStatus)
  //       .subscribe({

  //         next: (response: any) => {

  //           console.log('Application status updated:', response);

  //           this.alertService.success(
  //             `Marked as ${newStatus}.`
  //           );

  //         },

  //         error: (err: any) => {

  //           console.error('Error updating status:', err);

  //           applicant.status = previousStatus; // roll back

  //           this.alertService.error(
  //             err?.error?.message ||
  //             'Failed to update status.'
  //           );

  //         }

  //       });

  //   };

  //   // if (newStatus === 'Rejected') {

  //   //   this.confirmDialogService.onConfirm({

  //   //     title: 'Reject Applicant',

  //   //     message: `Are you sure you want to reject ${applicant.candidateName}?`,

  //   //     variant: 'danger',

  //   //     confirmLabel: 'Reject',

  //   //     cancelLabel: 'Cancel'

  //   //   }).subscribe((result: boolean) => {

  //   //     if (result) {
  //   //       proceed();
  //   //     }

  //   //   });

  //   //   return;

  //   // }

  //   proceed();

  // }

}