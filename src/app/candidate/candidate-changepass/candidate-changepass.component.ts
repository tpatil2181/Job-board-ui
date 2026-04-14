import { Component } from '@angular/core';
import { CandidateChangePassword } from '../../Interface/Canditate/candidate-chagepass';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-candidate-chagepass',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidate-changepass.component.html',
  styleUrl: './candidate-changepass.component.css'
})
export class CandidateChagepassComponent {


  confirmpass:string ='';

  changePass:CandidateChangePassword={
    currentPass:'',
    newPass:''

  }
    constructor(private authService: AuthService) {}

  submit() {
    if (this.changePass.newPass !== this.confirmpass) {
      alert('Passwords do not match ❌');
      return;
    }
    const userId = 152;

    console.log('Sending:', this.changePass);

    this.authService.changePassword(this.changePass,userId).subscribe({
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
