import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

   constructor(
      private authService: AuthService,
      private router: Router
    ) { }


   logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    // localStorage.removeItem('candidate');
    // this.isLoggedIn = false; 
    this.router.navigate(['/']);
  }

}


