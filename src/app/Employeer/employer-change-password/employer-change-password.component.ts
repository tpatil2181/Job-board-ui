import { Component } from '@angular/core';
import { SharedModule } from '../../pages/shared.module';
import { AuthService } from '../../services/auth.service';
// import { EmployerChangePassword } from '../../Interface/employerModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CandidateChangePassword } from '../../Interface/Canditate/candidate-chagepass';

@Component({
  selector: 'app-employer-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './employer-change-password.component.html',
  styleUrl: './employer-change-password.component.css'
})
export class EmployerChangePasswordComponent {

  
    confirmpass:string ='';
  
    changePass:CandidateChangePassword={
      // id
      currentPass:'',
      newPass:''
  
    }
      constructor(private authService: AuthService) {}
  
    submit() {
      if (this.changePass.newPass !== this.confirmpass) {
        alert('Passwords do not match ❌');
        return;
      }
      // const userId = 152;
  
      console.log('Sending:', this.changePass);
  
      this.authService.changePassword(this.changePass).subscribe({
        next: (res) => {
          alert('Password changed successfully ✅');
        },
        error: (err) => {
          console.error(err);
          alert('Error changing password ❌');
        }
      });
    }

}
