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

  getCandidateProfile() {

  }


//   login() {
//     console.log('Sending Data:', this.candidateLog);  //Remove this letter for security resone it is printing data on console
//     this.authService.login(this.candidateLog).subscribe({
//       next: (response) => {
//         // console.log(response);
//         // alert('Login Successful ✅');
//         //  console.log('INSIDE NEXT ✅');  
//         // this.router.navigate(['/login']);
//         // this.router.navigateByUrl('/userHome');
//         // localStorage.setItem('candidate', JSON.stringify(res));
//         localStorage.setItem('token', response.token);
//         localStorage.setItem('role', response.role);
//         localStorage.setItem('userId', response.userId.toString());
//         localStorage.setItem('email', response.email);
//         this.loadCandidateProfile();
//         this.router.navigate(['']); // redirect after login
//         // getCandidateProfile();

//       },
//       error: (err) => {
//         console.error(err);
        
//          if (err.error && err.error.message) {
//           alert(err.error.message);
//         } else {
//           // alert('Something went wrong ❌');
//           alert('Login Failed ❌');
//         }
//       }
      
//     });
//   }
  
//   loadCandidateProfile() {
    

//     this.authService.getCandidateProfile()
//       .subscribe({

//         next: (candidate) => {

//           this.authService.setCandidate(candidate);

//           // this.router.navigate(['/']);
//         },

//         error: (err) => {
//           console.error(err);
//         }
//       });
// }

login() {
  this.authService.login(this.candidateLog).subscribe({
    next: (response) => {

      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
      localStorage.setItem('userId', response.userId.toString());
      localStorage.setItem('email', response.email);

      this.authService.getCandidateProfile().subscribe({
        next: (candidate) => {

          this.authService.setCandidate(candidate);

          console.log('Profile Loaded:', candidate);

          this.router.navigate(['']);
        },

        error: (err) => {
          console.error('Profile API Error:', err);
        }
      });

    },
    error: (err) => {
      console.error(err);
    }
  });
}
  
  goToRegister() {
    this.router.navigate(['register']);
  }




//Remove after just for testing

  companylogin() {
    console.log('Sending Data:', this.candidateLog);  //Remove this letter for security resone it is printing data on console

    // TODO: API call
  
   
    this.authService.login(this.candidateLog).subscribe({
      next: (res) => {
        console.log(res);
        // alert('Login Successful ✅');
        //  console.log('INSIDE NEXT ✅');  
        // this.router.navigate(['/login']);
        // this.router.navigateByUrl('/userHome');
        //  this.router.navigate(['/profile', res.id]);
        this.router.navigate(['/userHome',res.id]); // redirect after login
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

}



  
 
  
