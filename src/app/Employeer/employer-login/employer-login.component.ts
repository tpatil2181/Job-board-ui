import { Component } from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { CandidateLogin } from '../../Interface/models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employer-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './employer-login.component.html',
  styleUrl: './employer-login.component.css'
})
export class EmployerLoginComponent {
  employerLogin = {
    email: '',
    password: ''
  };


  
  constructor(
      private authService: AuthService,
      private router: Router
    ) {}



  companylogin() {
    console.log('Sending Data:', this.employerLogin);  //Remove this letter for security resone it is printing data on console

    // TODO: API call
  
   
    this.authService.login(this.employerLogin).subscribe({
      next: (response) => {
        console.log(response);
        
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('userId', response.userId.toString());
          localStorage.setItem('email', response.email);
        // alert('Login Successful ✅');
        //  console.log('INSIDE NEXT ✅');  
        // this.router.navigate(['/login']);
        // this.router.navigateByUrl('/userHome');
        //  this.router.navigate(['/profile', res.id]);
        this.router.navigate(['/comapnyHome']); // redirect after login
      },
      error: (err) => {
        console.error(err);
        
         if (err.error && err.error.message) {
          alert(err.error.message);
        } else {
          // alert('Something went wrong ❌');
          alert('Login Failed ❌');
        }
      }
      
    });
  }


    goToRegister() {
    this.router.navigate(['companyRegister']);
  }
}

 
 


