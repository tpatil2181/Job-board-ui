// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { Employer } from '../../Interface/employerModel';

// @Component({
//   selector: 'app-company-sidebar',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './company-sidebar.component.html',
//   styleUrl: './company-sidebar.component.css'
// })
// export class CompanySidebarComponent {
//   name: string = localStorage.getItem('name') || '';
//   role: string = localStorage.getItem('role') || '';
//   email: string = localStorage.getItem('email') || '';


//   employer: Employer | null = null;

//   ngOnInit(): void {

//     this.authService.employer$.subscribe(employer => {

//       this.employer = employer;
//       this.getlogoUrl(this.employer?.companyLogoId);


//       console.log('Navbar employer:', this.employer);

//     });

//   }

//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) { }


//   logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('email');
//     localStorage.removeItem('Employer');
//     // this.isLoggedIn = false; 
//     this.router.navigate(['/']);
//   }

//   // ---------------------Get logo Section-----------------------------

//   imageUrl: string | null = null;
//   private imageObjectUrl: string | null = null;

//   getlogoUrl(imageId: number | null | undefined): void {
//     // Clear the previous image
//     if (this.imageObjectUrl) {
//       URL.revokeObjectURL(this.imageObjectUrl);
//       this.imageObjectUrl = null;
//     }

//     this.imageUrl = null;

//     if (!imageId) {
//       return;
//     }

//     this.authService.getImageUrl(imageId).subscribe({
//       next: (imageBlob: Blob) => {
//         this.imageObjectUrl = URL.createObjectURL(imageBlob);
//         this.imageUrl = this.imageObjectUrl;
//       },
//       error: (err) => {
//         console.error('Failed to load candidate image:', err);
//         this.imageUrl = null;
//       }
//     });
//   }

//   ngOnDestroy(): void {
//     if (this.imageObjectUrl) {
//       URL.revokeObjectURL(this.imageObjectUrl);
//     }
//   }

// }





import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Employer } from '../../Interface/employerModel';

@Component({
  selector: 'app-company-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './company-sidebar.component.html',
  styleUrl: './company-sidebar.component.css'
})
export class CompanySidebarComponent implements OnInit, OnDestroy {

  name = localStorage.getItem('name') || '';
  role = localStorage.getItem('role') || '';
  email = localStorage.getItem('email') || '';

  employer: Employer | null = null;

  imageUrl: string | null = null;
  private imageObjectUrl: string | null = null;
  private employerSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employerSubscription = this.authService.employer$.subscribe(
      (employer) => {
        this.employer = employer;

        // Update the sidebar text for the current employer.
        this.name = employer?.employeerName
          || localStorage.getItem('name')
          || '';

        this.email = employer?.empEmail
          || localStorage.getItem('email')
          || '';

        // Refresh the logo for the current employer.
        this.getlogoUrl(employer?.companyLogoId);

        console.log('Sidebar employer:', employer);
      }
    );
  }

  getlogoUrl(imageId: number | null | undefined): void {
    // Revoke the previous logo URL.
    if (this.imageObjectUrl) {
      URL.revokeObjectURL(this.imageObjectUrl);
      this.imageObjectUrl = null;
    }

    // Clear the previous employer's logo immediately.
    this.imageUrl = null;

    if (imageId == null) {
      return;
    }

    this.authService.getImageUrl(imageId).subscribe({
      next: (imageBlob: Blob) => {
        // Ignore empty responses.
        if (!imageBlob || imageBlob.size === 0) {
          return;
        }

        const newObjectUrl = URL.createObjectURL(imageBlob);

        // Revoke any previous URL before replacing it.
        if (this.imageObjectUrl) {
          URL.revokeObjectURL(this.imageObjectUrl);
        }

        this.imageObjectUrl = newObjectUrl;
        this.imageUrl = newObjectUrl;
      },
      error: (err) => {
        console.error('Failed to load employer logo:', err);
        this.imageUrl = null;
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('Employer');

    // Notify subscribers that no employer is logged in.
    this.authService.setEmployer(null);

    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.employerSubscription?.unsubscribe();

    if (this.imageObjectUrl) {
      URL.revokeObjectURL(this.imageObjectUrl);
      this.imageObjectUrl = null;
    }
  }
}
