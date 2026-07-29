import { Component, Input, OnInit, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isMenuOpen = false;

  /** Display name shown in navbar e.g. "Hi, Rahul" */
  @Input() userName: string = '';

  /** Controls which dashboard link to show */
  @Input() userRole: 'candidate' | 'employer' | '' = '';



  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    // if (this.showStats) {
    //   setTimeout(() => this.animateStats(), 300);
    // }
  }


  // ── Navigation methods ─────────────────────────────────
  goToLogin() {
            // this.isLoggedIn = true; 
        this.router.navigate(['login']);
  }

  logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
        // this.isLoggedIn = false; 
        this.router.navigate(['/']);
  }


  goToRegister() {
    this.router.navigate(['register']);
  }

   goToCompanyLogin(){
    this.router.navigate(['/companyLogin']);
  }

   goToCompanyRegister(){
    this.router.navigate(['/companyRegistration']);
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

   goToProfile() {
      this.router.navigate(['/JSProfile']);
      // this.router.navigate(['/JSProfile']);

    }

  goToChnagePasswordPage() {
      this.router.navigate(['/CandidateChangePass']);
      // this.router.navigate(['/JSProfile']);

    }
    
  goToAppliedJobs() {
    this.router.navigate(['/applied-jobs']);
  }

    menuItems = [
        {
          label: 'My Profile',
          icon: '👤',
          action: 'profile'
        },
        {
          label: 'Applied Jobs',
          icon: '📄',
          action: 'appliedJobs'
        },
        {
          label: 'Change Password',
          icon: '🔒',
          action: 'changePassword'
        },
        {
          label: 'Settings',
          icon: '⚙️',
          action: 'settings'
        },
        {
          label: 'Logout',
          icon: '🚪',
          action: 'logout'
        }
      ];
  
  onMenuClick(action: string): void {
    switch (action) {
      case 'profile':
        this.goToProfile();
        break;
  
      case 'appliedJobs':
        this.goToAppliedJobs();
        break;
  
      case 'changePassword':
        this.goToChnagePasswordPage();
        break;
  
      case 'settings':
        // this.goToSettings();
        break;
      case 'logout':
        this.logout();
        break;
    }
  
    this.isMenuOpen = false;
  }
      @HostListener('document:click', ['$event'])
      closeMenu(event: Event) {
        const target = event.target as HTMLElement;
  
        if (!target.closest('.profile-dropdown')) {
          this.isMenuOpen = false;
        }
      }
// My Code end===========================
  // ── Computed ───────────────────────────────────────────
  get dashboardRoute(): string {
    return this.userRole === 'employer'
      ? '/employer/dashboard'
      : '/candidate/dashboard';
  }

  // ── Navbar methods ─────────────────────────────────────
  onLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.router.navigate(['/']);
  }
}