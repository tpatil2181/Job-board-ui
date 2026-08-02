// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';


// @Component({
//   selector: 'app-home',
//   standalone: true,
//  imports: [CommonModule, FormsModule],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })

// export class HomeComponent {

//   searchText: string = '';
//   location: string = '';

//   jobs = [
//     { title: 'Java Developer', company: 'TCS', location: 'Pune' },
//     { title: 'Angular Developer', company: 'Infosys', location: 'Mumbai' },
//     { title: 'Spring Boot Developer', company: 'Wipro', location: 'Bangalore' }
//   ];

//   goHome() {
//     console.log(this.searchText, this.location);
//   }
// }

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { Job, Company, Filters } from '../../Interface/models';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from '../shared.module';
import { AlertService } from '../../services/alert.service.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,SharedModule],
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],

})
export class HomeComponent implements OnInit {
  

   constructor(
        private authService: AuthService,
        private router: Router,
        private alertService: AlertService
      ) {}

    ngOnInit(): void {
    this.animateCounters();
    this.loadJobs();
    // this.isLoggedIn = this.authService.isLoggedIn();
  }

  
//========================Variable Declaration ==========================================
    jobs: Job[] = [];



    
    // isLoggedIn = false;


    // keyword: string = '';

    
    jobTitle: string = '';
    jobLocation: string = '';
    // workMode: string = '';
    selectedWorkModes: string[] = [];
    experience: number | null = null;
    salary: number | null = null;
    industryType: string = '';
    selectedEmploymentTypes: string[] = [];
    selectedCategories: string[] = [];


//========================Searching Query work==========================================
searchJobs() {
  console.log("Search button clicked");
  this.authService.searchJobs({

    // keyword: this.keyword, use when search on any keword is implemented


    jobTitle: this.jobTitle,
    jobLocation: this.jobLocation,
    workMode: this.selectedWorkModes,
    experience: this.experience ?? undefined,
    salary: this.salary ?? undefined,
    industryType: this.industryType,
    employmentTypes: this.selectedEmploymentTypes,
    categories:this.selectedCategories

  }).subscribe({
      next: (response: any) => {

      console.log(response);

      this.jobs = response.content;   // ✅ Use content

    },
    error: (err) => {
      this.alertService.error("Something went wrong");

      console.error(err);

    }

  });

}

onEmploymentTypeChange(type: string, checked: boolean) {

    if (checked) {
      this.selectedEmploymentTypes.push(type);
    } else {
      this.selectedEmploymentTypes =
        this.selectedEmploymentTypes.filter(t => t !== type);
    }

    this.searchJobs();
  }

  clearEmploymentTypes() {
    this.selectedEmploymentTypes = [];
    this.searchJobs();
  }

  onWorkModeChange(mode: string, checked: boolean) {
    if (checked) {
      this.selectedWorkModes.push(mode);
    } 
    else {
      this.selectedWorkModes =
      this.selectedWorkModes.filter(m => m !== mode);
    }
    this.searchJobs();
  }
    clearWorkModes() {
      this.selectedWorkModes = [];
      this.searchJobs();
    }

 

onCategoryChange(category: string, checked: boolean) {

  if (checked) {

    this.selectedCategories.push(category);

  } else {

    this.selectedCategories =
      this.selectedCategories.filter(c => c !== category);

  }

  this.searchJobs();

}

clearCategories() {

  this.selectedCategories = [];

  this.searchJobs();

}



//======================== Backend Api Calls==========================================



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

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  

  loadJobs() {
    this.authService.getAllJobs().subscribe({
      next: (data: any) => {
        // console.log('FULL RESPONSE =>', JSON.stringify(data, null, 2));
        // console.log('API Response:', data);
        // console.log('Is Array:', Array.isArray(data));

        this.jobs = data.content || []; // Adjust based on actual API response structure
        this.filteredJobs = [...this.jobs];
      },
      error: (err) => {
        console.error(err);
      }
    });
  } 

  // viewJob(id: number): void {
  //   const job = this.jobs.find(j => j.jobId === id);
  //   if (job) {
  //     // In a real app: this.router.navigate(['/jobs', id]);
  //     // this.router.navigate(['register']);
  //      this.router.navigate(['/job', id]);
  //     // alert(`Opening job detail for:\n${job.title} at ${job.company}\n\n(In Angular → Router.navigate(['/jobs/${id}']))`);
  //   }
  // }

  viewJob(jobId: number) {

    if (!this.isLoggedIn) {
    this.router.navigate(['/login']);
    return;
  }

    this.router.navigate(['/job', jobId]);
}
  
  







//========================UI Logic==========================================


  isMenuOpen = false;


  goToProfile() {
      this.router.navigate(['/JSProfile']);
      // this.router.navigate(['/JSProfile']);

    }

  goToChnagePasswordPage() {
      this.router.navigate(['/CandidateChangePass']);
      // this.router.navigate(['/JSProfile']);

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
      
  // ── Data ──
  // allJobs: Job[] = [
  //   { id:1,  title:'Senior Software Engineer',  company:'Infosys',    location:'Bengaluru', type:'Full-time',  mode:'hybrid',  exp:'senior',  cat:'tech',      salary:'₹18–24 LPA',  logo:'I', color:'#007CC3', isNew:true,  posted:'Today',      applicants:87  },
  //   { id:2,  title:'Product Manager',            company:'Flipkart',   location:'Bengaluru', type:'Full-time',  mode:'onsite',  exp:'mid',     cat:'tech',      salary:'₹22–30 LPA',  logo:'F', color:'#F74F00', isNew:true,  posted:'Today',      applicants:53  },
  //   { id:3,  title:'UI/UX Designer',             company:'Zomato',     location:'Gurugram',  type:'Full-time',  mode:'hybrid',  exp:'junior',  cat:'design',    salary:'₹10–16 LPA',  logo:'Z', color:'#E23744', isNew:false, posted:'2 days ago', applicants:119 },
  //   { id:4,  title:'Data Analyst',               company:'TCS',        location:'Mumbai',    type:'Full-time',  mode:'onsite',  exp:'junior',  cat:'tech',      salary:'₹6–10 LPA',   logo:'T', color:'#1C3B6E', isNew:false, posted:'3 days ago', applicants:204 },
  //   { id:5,  title:'React Developer',            company:'Razorpay',   location:'Remote',    type:'Full-time',  mode:'remote',  exp:'mid',     cat:'tech',      salary:'₹14–20 LPA',  logo:'R', color:'#2D81F7', isNew:true,  posted:'1 day ago',  applicants:66  },
  //   { id:6,  title:'Digital Marketing Manager',  company:'Swiggy',     location:'Bengaluru', type:'Full-time',  mode:'hybrid',  exp:'mid',     cat:'marketing', salary:'₹12–18 LPA',  logo:'S', color:'#FC8019', isNew:false, posted:'4 days ago', applicants:44  },
  //   { id:7,  title:'Java Backend Developer',     company:'Wipro',      location:'Pune',      type:'Full-time',  mode:'onsite',  exp:'mid',     cat:'tech',      salary:'₹10–15 LPA',  logo:'W', color:'#341c5c', isNew:false, posted:'5 days ago', applicants:98  },
  //   { id:8,  title:'HR Business Partner',        company:'HCL Tech',   location:'Noida',     type:'Full-time',  mode:'hybrid',  exp:'senior',  cat:'hr',        salary:'₹12–16 LPA',  logo:'H', color:'#0076CE', isNew:false, posted:'1 week ago', applicants:37  },
  //   { id:9,  title:'Financial Analyst',          company:'HDFC Bank',  location:'Mumbai',    type:'Full-time',  mode:'onsite',  exp:'junior',  cat:'finance',   salary:'₹8–12 LPA',   logo:'H', color:'#004C97', isNew:true,  posted:'1 day ago',  applicants:72  },
  //   { id:10, title:'DevOps Engineer',            company:'Freshworks', location:'Remote',    type:'Full-time',  mode:'remote',  exp:'mid',     cat:'tech',      salary:'₹16–22 LPA',  logo:'F', color:'#25c16f', isNew:false, posted:'3 days ago', applicants:55  },
  //   { id:11, title:'Graphic Designer',           company:"Byju's",     location:'Bengaluru', type:'Full-time',  mode:'hybrid',  exp:'junior',  cat:'design',    salary:'₹6–9 LPA',    logo:'B', color:'#8A2BE2', isNew:false, posted:'6 days ago', applicants:88  },
  //   { id:12, title:'Software Intern',            company:'Ola',        location:'Bengaluru', type:'Internship', mode:'onsite',  exp:'fresher', cat:'tech',      salary:'₹15–25k/mo',  logo:'O', color:'#1C1C1C', isNew:true,  posted:'Today',      applicants:312 },
  // ];

  

  companies: Company[] = [
    { name:'Infosys',    logo:'I', color:'#007CC3', jobs:142 },
    { name:'TCS',        logo:'T', color:'#1C3B6E', jobs:210 },
    { name:'Wipro',      logo:'W', color:'#341c5c', jobs:98  },
    { name:'Flipkart',   logo:'F', color:'#F74F00', jobs:67  },
    { name:'Zomato',     logo:'Z', color:'#E23744', jobs:34  },
    { name:'Razorpay',   logo:'R', color:'#2D81F7', jobs:28  },
    { name:'Swiggy',     logo:'S', color:'#FC8019', jobs:45  },
    { name:'Freshworks', logo:'F', color:'#25c16f', jobs:52  },
    { name:'HCL Tech',   logo:'H', color:'#0076CE', jobs:89  },
    { name:'HDFC Bank',  logo:'H', color:'#004C97', jobs:61  },
    { name:'Ola',        logo:'O', color:'#1C1C1C', jobs:39  },
    { name:"Byju's",     logo:'B', color:'#8A2BE2', jobs:23  },
  ];

  // ── State ──
  filteredJobs: Job[] = [];
  currentPage = 1;
  readonly PER_PAGE = 6;
  savedJobs = new Set<number>();
  sortValue = 'relevant';

  // Search inputs
  searchQuery = '';
  locationQuery = '';

  // Filters
  filters: Filters = {
    types: [],
    modes: [],
    exps: [],
    cats: [],
    location: '',
    query: ''
  };

  // Animated counter values
  statActiveJobs = 0;
  statCompanies = 0;
  statPlaced = 0;
  statCities = 0;

  // Popular search tags
  popularSearches = ['Software Engineer', 'Product Manager', 'Data Analyst', 'UI UX Designer', 'Remote'];

 

  // ── Counter Animation ──
  animateCounters(): void {
    this.animateCount('activeJobs', 48000, 0);
    this.animateCount('companies',  12000, 200);
    this.animateCount('placed',     95000, 400);
    this.animateCount('cities',     50,    600);
  }

  animateCount(key: string, target: number, delay: number): void {
    setTimeout(() => {
      let n = 0;
      const step = target / 60;
      const interval = setInterval(() => {
        n = Math.min(n + step, target);
        switch (key) {
          case 'activeJobs': this.statActiveJobs = Math.floor(n); break;
          case 'companies':  this.statCompanies  = Math.floor(n); break;
          case 'placed':     this.statPlaced     = Math.floor(n); break;
          case 'cities':     this.statCities     = Math.floor(n); break;
        }
        if (n >= target) clearInterval(interval);
      }, 16);
    }, delay);
  }

  // ── Search ──
  handleSearch(): void {
    this.filters.query = this.searchQuery;
    this.filters.location = this.locationQuery;
    this.applyFilters();
    document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
  }

  fillSearch(tag: string) {

  this.jobTitle = tag;
  this.searchJobs();

}

  // fillSearch(val: string): void {
  //   this.searchQuery = val;
  //   this.filters.query = val;
  //   this.applyFilters();
  //   document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
  // }

  // ── Filters ──
  onCheckboxChange(group: keyof Pick<Filters, 'types' | 'modes' | 'exps' | 'cats'>, value: string, checked: boolean): void {
    const arr = this.filters[group] as string[];
    if (checked) {
      if (!arr.includes(value)) arr.push(value);
    } else {
      const idx = arr.indexOf(value);
      if (idx > -1) arr.splice(idx, 1);
    }
    this.applyFilters();
  }

  isChecked(group: keyof Pick<Filters, 'types' | 'modes' | 'exps' | 'cats'>, value: string): boolean {
    return (this.filters[group] as string[]).includes(value);
  }

  onLocationFilterChange(val: string): void {
    this.filters.location = val;
    this.applyFilters();
  }

  clearFilter(group: keyof Pick<Filters, 'types' | 'modes' | 'exps' | 'cats'>): void {
    (this.filters[group] as string[]) = [];
    this.applyFilters();
  }

  applyFilters(): void {
    const typeMap: Record<string, string> = {
      'Full-time': 'full-time', 'Part-time': 'part-time',
      'Contract': 'contract', 'Internship': 'internship'
    };

    this.filteredJobs = this.jobs.filter(j => {
      if (this.filters.types.length && !this.filters.types.includes(typeMap[j.industryType])) return false;
      if (this.filters.modes.length && !this.filters.modes.includes(j.workMode)) return false;
      // if (this.filters.exps.length  && !this.filters.exps.includes(j.exp))   return false;
      // if (this.filters.cats.length  && !this.filters.cats.includes(j.cat))   return false;
      // if (this.filters.location && !j.location.toLowerCase().includes(this.filters.location.toLowerCase())) return false;
      // if (this.filters.query && !j.title.toLowerCase().includes(this.filters.query.toLowerCase())
                            //  && !j.company.toLowerCase().includes(this.filters.query.toLowerCase())) return false;
      return true;
    });

    this.currentPage = 1;
    this.sortJobs(this.sortValue);
  }

  // ── Sort ──
  onSortChange(val: string): void {
    this.sortValue = val;
    this.sortJobs(val);
  }

  sortJobs(val: string): void {
    if (val === 'recent') {
      this.filteredJobs = [...this.filteredJobs].sort((a, b) => b.jobId - a.jobId);
    } else if (val === 'salary') {
      // this.filteredJobs = [...this.filteredJobs].sort((a, b) => parseInt(b.minSalary) - parseInt(a.maxSalary) || 0);
    } else {
      this.filteredJobs = [...this.filteredJobs].sort((a, b) => (b.datePosted ? 1 : 0) - (a.datePosted ? 1 : 0));
    }
  }

  // ── Pagination ──
  get pagedJobs(): Job[] {
    const start = (this.currentPage - 1) * this.PER_PAGE;
    return this.filteredJobs.slice(start, start + this.PER_PAGE);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredJobs.length / this.PER_PAGE);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goPage(n: number): void {
    this.currentPage = n;
    document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
  }

  // ── Save ──
  toggleSave(id: number, event: Event): void {
    event.stopPropagation();
    if (this.savedJobs.has(id)) {
      this.savedJobs.delete(id);
    } else {
      this.savedJobs.add(id);
    }
  }

  isSaved(id: number): boolean {
    return this.savedJobs.has(id);
  }



  // ── Helpers ──
  formatNumber(n: number): string {
    return n.toLocaleString('en-IN');
  }

  capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  trackByJob(_: number, job: Job): number {
    return job.jobId;
  }

//==================================================================


  // jobs: Job[] = [];


  goToAppliedJobs() {
    this.router.navigate(['/applied-jobs']);
  }


//===========================Emplolyer=======================================
  goToCompanyLogin(){
    this.router.navigate(['/companyLogin']);
  }

   goToCompanyRegister(){
    this.router.navigate(['/companyRegistration']);
  }

  // goToCompanyRegister(){
  //   this.router.navigate(['/comapnyHome']);
  // }
}




