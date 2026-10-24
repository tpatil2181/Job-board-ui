import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Employer } from '../../Interface/employerModel';

@Component({
  selector: 'app-company-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './company-sidebar.component.html',
  styleUrl: './company-sidebar.component.css'
})
export class CompanySidebarComponent {
  name: string = localStorage.getItem('name') || '';
  role: string = localStorage.getItem('role') || '';
  email: string = localStorage.getItem('email') || '';


  employer: Employer | null = null;

  ngOnInit(): void {

    this.authService.employer$.subscribe(employer => {

      this.employer = employer;
      this.getlogoUrl(this.employer?.companyLogoId);


      console.log('Navbar employer:', this.employer);

    });

  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('Employer');
    // this.isLoggedIn = false; 
    this.router.navigate(['/']);
  }

  // ---------------------Get logo Section-----------------------------

  imageUrl: string | null = null;
  private imageObjectUrl: string | null = null;

  getlogoUrl(imageId: number | null | undefined): void {
    // Clear the previous image
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

}


