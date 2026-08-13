import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CandidateRegistration } from '../../Interface/models';
import { registerEmployer } from '../../Interface/employerModel';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employer-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employer-registration.component.html',
  styleUrl: './employer-registration.component.css'
})
export class EmployerRegistrationComponent {

  
    // ✅ Interface object
    candidate: CandidateRegistration = {
      firstName: '',
      lastName: '',
      mobNo: '',
      email: '',
      password: ''
    };

     Employer: registerEmployer = {
      employerName: '',
      website: '',
      email: '',
      password: '',
      contact: 0
    };
  
    constructor(
      private authService: AuthService,
      private router: Router
    ) { }
  
    register() {
      console.log('Sending Data:', this.Employer);  //Remove this letter for security resone it is printing data on console
  
      this.authService.EmployerRegister(this.Employer).subscribe({
        next: (res) => {
          console.log(res);
          alert('Registration Successful ✅');
          this.router.navigate(['companyLogin']);
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
      this.router.navigate(['/companyLogin']);
    }
}

