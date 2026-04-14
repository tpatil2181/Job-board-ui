import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateLogin } from '../../Interface/models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
   candidateLog: CandidateLogin = {

      email: '',
      password: ''
    };


  constructor(
      private authService: AuthService,
      private router: Router
    ) {}

  // constructor(private router: Router) {}

  login() {
    console.log('Sending Data:', this.candidateLog);  //Remove this letter for security resone it is printing data on console

    // TODO: API call
  
   
    this.authService.login(this.candidateLog).subscribe({
      next: (res) => {
        console.log(res);
        // alert('Login Successful ✅');
        //  console.log('INSIDE NEXT ✅');  
        // this.router.navigate(['/login']);
        // this.router.navigateByUrl('/userHome');
        this.router.navigate(['/userHome']); // redirect after login
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
    this.router.navigate(['register']);
  }

}



  
 
  
