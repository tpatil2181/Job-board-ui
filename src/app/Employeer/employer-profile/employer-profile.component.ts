// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-employer-profile',
//   standalone: true,
//   imports: [],
//   templateUrl: './employer-profile.component.html',
//   styleUrl: './employer-profile.component.css'
// })
// export class EmployerProfileComponent {

// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Adjust this path/name to where your Employer interface lives
import { Employer } from '../../Interface/employerModel';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service.service';


// =====================================================
// Component
// =====================================================

@Component({
  selector: 'app-employer-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
export class EmployerProfileComponent implements OnInit {


  // =====================================================
  // State
  // =====================================================

  employer: Employer | null = null;

  loading = false;

  saving = false;

  showEditForm = false;

  // Edit form model — contact kept as string for the input,
  // converted back to a number on save.
  editForm = {
    employeerName: '',
    website: '',
    contact: ''
  };


  // =====================================================
  // Constructor
  // =====================================================

  constructor(
    private authService: AuthService,   // replace with your real AuthService type
    private alertService: AlertService   // replace with your real AlertService type
  ) {}


  // =====================================================
  // Lifecycle
  // =====================================================

  ngOnInit(): void {

    this.loadEmployer();

  }


  // =====================================================
  // Load profile
  // =====================================================

  loadEmployer(): void {

    this.loading = true;

    this.authService
      .getEmployerProfile()
      .subscribe({

        next: (response: Employer) => {

          this.employer = response;
          this.loading = false;

        },

        error: (err: any) => {

          console.error('Error loading employer profile:', err);

          this.loading = false;

          this.alertService.error(
            err?.error?.message ||
            'Failed to load employer profile.'
          );

        }

      });

  }


  // =====================================================
  // Derived display values
  // =====================================================

  get initials(): string {

    return (this.employer?.employeerName || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      // .map(part => part[0]?.toUpperCase())
      .join('');

  }

  // Makes sure the link opens correctly even if the saved
  // website has no protocol.
  get websiteHref(): string {

    const url = (this.employer?.website || '').trim();

    if (!url) {
      return '';
    }

    return /^https?:\/\//i.test(url) ? url : `https://${url}`;

  }

  // `joblist` is a String on the backend — treated here as a
  // comma-separated list and shown as chips.
  // get jobTags(): string[] {

  //   return (this.employer?.joblist || '')
  //     .split(',')
  //     // .map(job => job.trim())
  //     .filter(Boolean);

  // }


  // =====================================================
  // Edit modal
  // =====================================================

  openEdit(): void {

    if (!this.employer) {
      return;
    }

    this.editForm = {
      employeerName: this.employer.employeerName ?? '',
      website: this.employer.website ?? '',
      contact: this.employer.contact != null ? String(this.employer.contact) : ''
    };

    this.showEditForm = true;

  }

  closeEdit(): void {

    this.showEditForm = false;

  }

  onOverlayClick(event: MouseEvent): void {

    if (event.target === event.currentTarget) {

      this.closeEdit();

    }

  }

  onSave(form: any): void {

    if (form.invalid || !this.employer) {

      return;

    }

    const payload: Employer = {

      ...this.employer,

      employeerName: this.editForm.employeerName.trim(),

      website: this.editForm.website.trim(),

      contact: Number(this.editForm.contact)

    };

    this.saving = true;

//     this.authService
//       .updateEmployer(payload)
//       .subscribe({

//         next: (response: Employer) => {

//           this.employer = response ?? payload;
//           this.saving = false;
//           this.showEditForm = false;

//           this.alertService.success(
//             'Profile updated successfully.'
//           );

//         },

//         error: (err: any) => {

//           console.error('Error updating employer profile:', err);

//           this.saving = false;

//           this.alertService.error(
//             err?.error?.message ||
//             'Failed to update profile.'
//           );

//         }

//       });

  }

}
