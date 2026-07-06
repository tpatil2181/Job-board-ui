import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

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
