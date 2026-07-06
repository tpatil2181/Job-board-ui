import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-company-navbar',
  standalone: true,
  imports: [],
  templateUrl: './company-navbar.component.html',
  styleUrl: './company-navbar.component.css'
})
export class CompanyNavbarComponent {

   constructor(private router: Router) {}

  logout(event: Event) {
     event.preventDefault(); // ✅ stops page refresh

      // ✅ Clear stored user data
      localStorage.removeItem('candidate');
      localStorage.removeItem('token'); // if using JWT

      // ✅ Navigate to login page
     localStorage.removeItem('userEmail');
  this.router.navigate(['/login']);
}

}
