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
  // Logo state
  // =====================================================

  // The newly picked file (null = keep the current logo)
  logoFile: File | null = null;

  // What the preview box in the edit modal shows
  // (the picked file, or the current saved logo)
  logoPreviewUrl: string | null = null;

  logoError = '';

  // Changes after every save so the browser reloads the logo
  // even if the backend reuses the same id / URL.
  logoVersion = Date.now();

  readonly maxLogoSize = 2 * 1024 * 1024; // 2 MB

  readonly allowedLogoTypes = ['image/png', 'image/jpeg', 'image/webp'];


  // =====================================================
  // Constructor
  // =====================================================

  constructor(
    private authService: AuthService,   // replace with your real AuthService type
    private alertService: AlertService   // replace with your real AlertService type
  ) { }


  // =====================================================
  // Lifecycle
  // =====================================================


  ngOnInit(): void {

    this.loadEmployer();
    //  console.log('Employer profile component initialized:', this.employer);
    // this.getlogoUrl(this.employer?.companyLogoId);

    // console.log(this.imageUrl);

  }


  // --------Load-----
  imageUrl: string | null = null;
  private imageObjectUrl: string | null = null;



  getlogoUrl(imageId: number | null | undefined): void {
    // Clear the previous image
    console.log('getlogoUrl called with imageId:', imageId);
    if (this.imageObjectUrl) {
      URL.revokeObjectURL(this.imageObjectUrl);
      this.imageObjectUrl = null;
    }

    this.imageUrl = null;

    if (!imageId) {
      return;
    }

    this.authService.getImageUrl(imageId).subscribe({
      next: (imageBlob: Blob) => {
        this.imageObjectUrl = URL.createObjectURL(imageBlob);
        this.imageUrl = this.imageObjectUrl;
      },
      error: (err) => {
        console.error('Failed to load candidate image:', err);
        this.imageUrl = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.imageObjectUrl) {
      URL.revokeObjectURL(this.imageObjectUrl);
    }
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

          this.getlogoUrl(this.employer?.companyLogoId);

          console.log(this.imageUrl);
          // console.log('Loaded employer profile:', this.employer); OK

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

  // Saved company logo, or '' when the employer has none yet.
  get logoUrl(): string {

    const logoId = this.employer?.companyLogoId;

    return logoId
      ? `${this.authService.getImageUrl(logoId)}?v=${this.logoVersion}`
      : '';

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
  // Logo picking
  // =====================================================

  onLogoSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    const file = input.files?.[0];

    // Clear the input so picking the same file again still fires (change)
    input.value = '';

    if (!file) {
      return;
    }

    this.logoError = '';

    if (!this.allowedLogoTypes.includes(file.type)) {

      this.logoError = 'Choose a PNG, JPG or WebP image.';
      return;

    }

    if (file.size > this.maxLogoSize) {

      this.logoError = 'Logo must be 2 MB or smaller.';
      return;

    }

    this.logoFile = file;

    const reader = new FileReader();

    reader.onload = () => {

      this.logoPreviewUrl = reader.result as string;

    };

    reader.readAsDataURL(file);

  }

  // Drops the newly picked file and goes back to the saved logo
  // clearSelectedLogo(): void {

  //   this.logoFile = null;

  //   this.logoError = '';

  //   this.logoPreviewUrl = this.logoUrl || null;

  // }

  clearSelectedLogo(): void {
    this.logoFile = null;
    this.logoError = '';
    this.logoPreviewUrl = this.imageUrl;
  }


  // =====================================================
  // Edit modal
  // =====================================================

  // openEdit(): void {

  //   if (!this.employer) {
  //     return;
  //   }

  //   this.editForm = {
  //     employeerName: this.employer.employeerName ?? '',
  //     website: this.employer.website ?? '',
  //     contact: this.employer.contact != null ? String(this.employer.contact) : ''
  //   };

  //   // Start from the saved logo, with no pending upload
  //   this.logoFile = null;

  //   this.logoError = '';

  //   this.logoPreviewUrl = this.logoUrl || null;

  //   this.showEditForm = true;

  // }

  openEdit(): void {
    if (!this.employer) {
      return;
    }

    this.editForm = {
      employeerName: this.employer.employeerName ?? '',
      website: this.employer.website ?? '',
      contact: this.employer.contact != null
        ? String(this.employer.contact)
        : ''
    };

    this.logoFile = null;
    this.logoError = '';
    this.logoPreviewUrl = this.imageUrl;
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

    // =====================================================
    // Save with logo
    // 1) if a new logo was picked, upload it and get its id
    // 2) save the employer with that companyLogoId
    // 3) show the new logo straight away
    // =====================================================

    // Captured here because `this.employer` can't be narrowed inside callbacks
    const employerId = this.employer.employeerId;
    const currentLogoId = this.employer.companyLogoId;

    const saveEmployer = (companyLogoId: number) => {

      const updated: Employer = { ...payload, companyLogoId };

      this.authService
        .updateEmployer(updated)
        .subscribe({

          // next: (response: Employer) => {

          //   this.employer = response ?? updated;

          //   // Force the browser to load the new logo
          //   this.logoVersion = Date.now();

          //   this.logoFile = null;

          //   this.saving = false;

          //   this.showEditForm = false;

          //   this.alertService.success(
          //     'Profile updated successfully.'
          //   );

          // },

          next: (response: Employer) => {
            this.employer = response ?? updated;

            // Reload the saved logo using its latest ID.
            this.getlogoUrl(this.employer.companyLogoId);

            this.logoFile = null;
            this.logoPreviewUrl = null;
            this.saving = false;
            this.showEditForm = false;

            this.alertService.success('Profile updated successfully.');
          },

          error: (err: any) => {

            console.error('Error updating employer profile:', err);

            this.saving = false;

            this.alertService.error(
              err?.error?.message ||
              'Failed to update profile.'
            );

          }

        });

    };

    if (this.logoFile) {

      this.authService
        .uploadEmployerLogo(employerId, this.logoFile)
        .subscribe({

          next: (res: any) => {

            // Adjust to whatever your upload endpoint returns
            // (a plain number, or an object with imageId / id).
            const newLogoId = Number(res?.imageId ?? res?.id ?? res);

            if (!newLogoId) {

              this.saving = false;

              this.alertService.error(
                'Logo uploaded but no image id was returned.'
              );

              return;

            }

            saveEmployer(newLogoId);

          },

          error: (err: any) => {

            console.error('Error uploading logo:', err);

            this.saving = false;

            this.alertService.error(
              err?.error?.message ||
              'Failed to upload logo.'
            );

          }

        });

      return;

    }

    // No new logo picked: keep the one already saved
    saveEmployer(currentLogoId);

  }

}