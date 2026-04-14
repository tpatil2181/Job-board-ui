import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-candidate-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidate-profile.component.html',
  styleUrl: './candidate-profile.component.css'
})
export class CandidateProfileComponent {

  constructor(private authService: AuthService) { }

  user = {
    name: 'Tushar Patil',
    title: 'Java Developer | Spring Boot | Angular',
    email: 'tusharpatil@gmail.com',
    mobile: '+91 1234567890',
    description: 'Fullstack developer with experience in modern technologies like Spring Boot and Angular.',
    experience: 'Fresher / 1 Year',
    education: 'B.E Computer Engineering',
    skills: 'Java, Spring Boot, Angular, SQL',
    languages: 'English, Hindi, Marathi'
  };

  profileImage: any;
  resume: any;


 

  onProfileImageUpload(event: any) {
    this.profileImage = event.target.files[0];
  }


//================Resume Uploaded Section================
  selectedFile!: File;
  //  onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  onResumeUpload(event:any) {
    this.selectedFile = event.target.files[0];
    if (!this.selectedFile) {
      alert('Please select a file');
      return;
    }

    this.authService.uploadResume(this.selectedFile, 102).subscribe({
      next: (res) => {
        console.log(res);
        alert('Resume uploaded successfully ✅');
      },
      error: (err) => {
        console.error(err);
        
         if (err.error && err.error.message) {
          alert(err.error.message);
        } else {
          // alert('Something went wrong ❌');
           alert('Upload failed ❌');
        }
      
      }
    });
  }


  viewResume() {
    alert('Resume preview feature coming soon 🚀');
  }
}