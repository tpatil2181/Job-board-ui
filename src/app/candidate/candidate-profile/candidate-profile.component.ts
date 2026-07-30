import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Candidate } from '../../Interface/Canditate/candidate';
import { SharedModule } from "../../pages/shared.module";


export interface TimelineItem {
  icon: string;
  title: string;
  subtitle: string;
  description?: string;
  link?: string;
}

export interface SkillTag {
  label: string;
  variant: 'blue' | 'gray';
}

export interface LanguageItem {
  name: string;
  level: string;
}



@Component({
  selector: 'app-candidate-profile',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent {
//============================ My Code And variables============================
  profileImage: any;
  resume: any;


 candidate = this.authService.getLoggedInCandidate();
 candidateemail: string  = localStorage.getItem('email') || '';
 usrId: number = localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : 0;

// candidate: Candidate = {
//        first_name: '',
//         last_name:'',
//         mobNo:'',
//         email:'',
//         education:'',
//          resume: {
//               id: 0,
//               filePath: '',
//               candidateId:0,
//             },
//         skills:'', 
//     };

  ngOnInit() {
    // ✅ get ID from URL
    // const email = this.route.snapshot.paramMap.get('email');

    // console.log('User ID from URL:', email);

    // if (email) {
    //   this.getCandidate(email);
    // }
  }

  


   constructor(
    private route: ActivatedRoute,
    // private authService: AuthService
    public authService: AuthService
  ) {}
//============================ My Code And variables END============================

  // ---- profile summary ----
  name = 'Ananya Kulkarni';
  role = 'Senior Product Designer';
  location = 'Pune, Maharashtra';
  experienceYears = 6;
  openToWork = true;
  profileStrength = 82;
  avatarInitials = 'AK';

  isEditingProfile = false;

  // ---- about ----
  aboutText = `Product designer with 6 years of experience building design systems and
  end-to-end product experiences for fintech and marketplace platforms. Currently leading design
  for checkout and onboarding flows, with a focus on accessibility and conversion impact.`;
  isEditingAbout = false;

  // ---- resume ----
  resumeFileName = 'Ananya_Kulkarni.pdf';
  resumeUpdatedLabel = 'Updated 5 days ago';

  // ---- skills ----
  skills: SkillTag[] = [
    { label: 'UI Design', variant: 'blue' },
    { label: 'Figma', variant: 'blue' },
    { label: 'Design Systems', variant: 'blue' },
    { label: 'User Research', variant: 'gray' },
    { label: 'Prototyping', variant: 'gray' },
    { label: 'HTML/CSS', variant: 'gray' }
  ];

  // ---- experience ----
  experience: TimelineItem[] = [
    {
      icon: 'Z',
      title: 'Senior Product Designer',
      subtitle: 'Zeta Finance · Bengaluru · Mar 2023 — Present'
    },
    {
      icon: 'M',
      title: 'Product Designer',
      subtitle: 'Meesho · Bengaluru · Jul 2020 — Feb 2023'
    },
    {
      icon: 'S',
      title: 'UI/UX Design Intern',
      subtitle: 'Swiggy · Bengaluru · Jan 2020 — Jun 2020'
    }
  ];

  // ---- education ----
  education: TimelineItem[] = [
    {
      icon: '🎓',
      title: 'B.Des, Communication Design',
      subtitle: 'National Institute of Design, Ahmedabad · 2016 — 2020'
    },
    {
      icon: '🎓',
      title: 'Higher Secondary, Science',
      subtitle: 'Fergusson College, Pune · 2014 — 2016'
    }
  ];

  // ---- projects ----
  projects: TimelineItem[] = [
    {
      icon: '📁',
      title: 'Checkout Redesign — Zeta Pay',
      subtitle: '',
      description: 'Redesigned the multi-step checkout flow, reducing cart abandonment by 17%.',
      link: '#'
    },
    {
      icon: '📁',
      title: 'Seller Onboarding — Meesho',
      subtitle: '',
      description: 'Simplified seller KYC and listing flow across web and mobile.',
      link: '#'
    }
  ];

  // ---- certifications ----
  certifications: TimelineItem[] = [
    {
      icon: '🏅',
      title: 'Certified UX Design Professional',
      subtitle: 'Google · via Coursera · 2023'
    },
    {
      icon: '🏅',
      title: 'Design Systems Certification',
      subtitle: 'Interaction Design Foundation · 2021'
    }
  ];

  // ---- languages ----
  languages: LanguageItem[] = [
    { name: 'English', level: 'Professional' },
    { name: 'Hindi', level: 'Native' },
    { name: 'Marathi', level: 'Native' }
  ];

  // ---- toast ----
  toastMessage = '';
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  showToast(message: string): void {
    this.toastMessage = message;
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = setTimeout(() => (this.toastMessage = ''), 2200);
  }

  // ---- profile edit ----
  toggleEditProfile(): void {
    if (this.isEditingProfile) {
      this.showToast('Profile updated successfully');
    }
    this.isEditingProfile = !this.isEditingProfile;
  }

  onNameInput(event: Event): void {
    this.name = (event.target as HTMLElement).innerText.trim();
  }

  onRoleInput(event: Event): void {
    this.role = (event.target as HTMLElement).innerText.trim();
  }

  // ---- about edit ----
  toggleEditAbout(): void {
    if (this.isEditingAbout) {
      this.showToast('About section saved');
    }
    this.isEditingAbout = !this.isEditingAbout;
  }

  onAboutInput(event: Event): void {
    this.aboutText = (event.target as HTMLElement).innerText.trim();
  }

  // ---- resume ----

  selectedFile!: File;
   onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateResume(): void {
    // this.selectedFile = event.target.files[0];
    if (!this.selectedFile) {
      alert('Please select a file');
      // this.authService.getCandidate(this.candidate.email).subscribe(res => {
      // localStorage.setItem('candidate', JSON.stringify(res)); // update storage
      // });



      // this.authService.getLoggedInCandidate().subscribe(res => {
      // localStorage.setItem('candidate', JSON.stringify(res)); // update storage
      // });
      return;
    }

    this.authService.uploadResume(this.selectedFile,  this.usrId).subscribe({
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
//   }
    // this.resumeUpdatedLabel = 'Updated just now';
    // this.showToast('Resume updated successfully');
  }

  viewResume(): void {
    const resumeId = this.candidate.resumeId;
    console.error("Resume id is "+ this.candidate.first_name);
      // ✅ MUST check
      if (!resumeId) {
        console.error('Resume ID is missing ❌');
        alert('Resume not available');
        return;
      }
       this.authService.getResume(resumeId).subscribe({
        next: (res: Blob) => {
          const fileURL = window.URL.createObjectURL(res);
          window.open(fileURL); // ✅ opens PDF
        },
        error: (err) => {
          console.error(err);
          alert('Failed to load resume ❌');
        }
      });
  }

  uploadPhoto(): void {
    this.showToast('Upload a new photo');
  }

  // ---- skills ----
  removeSkill(skill: SkillTag): void {
    this.skills = this.skills.filter(s => s !== skill);
    this.showToast(`Removed "${skill.label}"`);
  }

  addSkill(): void {
    this.showToast('Skill added');
  }

  // ---- generic list section handlers ----
  addItem(section: string): void {
    this.showToast(`New ${section} entry added`);
  }

  editItem(section: string): void {
    this.showToast(`Editing ${section} entry`);
  }

  removeItem(list: TimelineItem[], item: TimelineItem, section: string): void {
    const index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
    }
    this.showToast(`${section} entry removed`);
  }

  addLanguage(): void {
    this.showToast('Language added');
  }



  // Backend API Calls
  // getCandidate(email: string) {
  //   this.authService.getCandidateProfile(email).subscribe({
  //     next: (res) => {
  //       this.candidate = res;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     }
  //   });
  // }
}




// Old Code

// @Component({
//   selector: 'app-candidate-profile',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './candidate-profile.component.html',
//   styleUrl: './candidate-profile.component.css'
// })
// export class CandidateProfileComponent implements OnInit {

//   // constructor(private authService: AuthService) { }

//   // user = {
//   //   name: 'Tushar Patil',
//   //   title: 'Java Developer | Spring Boot | Angular',
//   //   email: 'tusharpatil@gmail.com',
//   //   mobile: '+91 1234567890',
//   //   description: 'Fullstack developer with experience in modern technologies like Spring Boot and Angular.',
//   //   experience: 'Fresher / 1 Year',
//   //   education: 'B.E Computer Engineering',
//   //   skills: 'Java, Spring Boot, Angular, SQL',
//   //   languages: 'English, Hindi, Marathi'
//   // };

//   profileImage: any;
//   resume: any;


//  candidate = this.authService.getLoggedInCandidate();
//  candidateemail: string  = localStorage.getItem('email') || '';
//  usrId: number = localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : 0;

// // candidate: Candidate = {
// //        first_name: '',
// //         last_name:'',
// //         mobNo:'',
// //         email:'',
// //         education:'',
// //          resume: {
// //               id: 0,
// //               filePath: '',
// //               candidateId:0,
// //             },
// //         skills:'', 
// //     };


//    constructor(
//     private route: ActivatedRoute,
//     // private authService: AuthService
//     public authService: AuthService
//   ) {}

//   get isLoggedIn(): boolean {
//    return this.authService.isLoggedIn();
//   }

//   ngOnInit() {
//     // ✅ get ID from URL
//     // const email = this.route.snapshot.paramMap.get('email');

//     // console.log('User ID from URL:', email);

//     // if (email) {
//     //   this.getCandidate(email);
//     // }
//   }

//   // getCandidate(email: string) {
//   //   this.authService.getCandidate(email).subscribe({
//   //     next: (res) => {
//   //       this.candidate = res;
//   //     },
//   //     error: (err) => {
//   //       console.error(err);
//   //     }
//   //   });
//   // }


 

//   onProfileImageUpload(event: any) {
//     this.profileImage = event.target.files[0];
//   }


// //================Resume Uploaded Section================
//   selectedFile!: File;
//   //  onFileSelected(event: any) {
//   //   this.selectedFile = event.target.files[0];
//   // }

//   onResumeUpload(event:any) {
//     this.selectedFile = event.target.files[0];
//     if (!this.selectedFile) {
//       alert('Please select a file');
//       // this.authService.getCandidate(this.candidate.email).subscribe(res => {
//       // localStorage.setItem('candidate', JSON.stringify(res)); // update storage
//       // });



//       // this.authService.getLoggedInCandidate().subscribe(res => {
//       // localStorage.setItem('candidate', JSON.stringify(res)); // update storage
//       // });
//       return;
//     }

//     this.authService.uploadResume(this.selectedFile,  this.usrId).subscribe({
//       next: (res) => {
//         console.log(res);
//         alert('Resume uploaded successfully ✅');
//       },
//       error: (err) => {
//         console.error(err);
        
//          if (err.error && err.error.message) {
//           alert(err.error.message);
//         } else {
//           // alert('Something went wrong ❌');
//            alert('Upload failed ❌');
//         }
      
//       }
//     });
//   }


  

// viewResume() {
//   const resumeId = this.candidate.resumeId;
//  console.error("Resume id is "+ this.candidate.first_name);
//   // ✅ MUST check
//   if (!resumeId) {
//     console.error('Resume ID is missing ❌');
//     alert('Resume not available');
//     return;
//   }

//   this.authService.getResume(resumeId).subscribe({
//     next: (res: Blob) => {
//       const fileURL = window.URL.createObjectURL(res);
//       window.open(fileURL); // ✅ opens PDF
//     },
//     error: (err) => {
//       console.error(err);
//       alert('Failed to load resume ❌');
//     }
//   });
// }




// }