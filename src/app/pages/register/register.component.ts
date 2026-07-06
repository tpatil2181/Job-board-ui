import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateRegistration } from '../../Interface/models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // ✅ Interface object
  candidate: CandidateRegistration = {
    first_name: '',
    last_name: '',
    mobNo: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register() {
    console.log('Sending Data:', this.candidate);  //Remove this letter for security resone it is printing data on console

    this.authService.register(this.candidate).subscribe({
      next: (res) => {
        console.log(res);
        alert('Registration Successful ✅');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        
        if (err.error && err.error.message) {
          alert(err.error.message);
        } else {
          // alert('Something went wrong ❌');
          alert('Registration Failed ❌');
        }

      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}