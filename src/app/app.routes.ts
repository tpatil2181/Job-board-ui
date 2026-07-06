import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CandidateHomeComponent } from './candidate/candidate-home/candidate-home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
// import { NewHomeComponent } from './pages/new-home/new-home.component';
import { CandidateChagepassComponent } from './candidate/candidate-changepass/candidate-changepass.component';
import { CandidateProfileComponent } from './candidate/candidate-profile/candidate-profile.component';
import { AppliedJobsComponent } from './candidate/applied-jobs/applied-jobs.component';
import { CompanyHomeComponent } from './Employeer/company-home/company-home.component';
import { JobDescriptionComponent } from './pages/job-description/job-description.component';
import {PostJobComponent} from './Employeer/post-job/post-job.component';
import {PostedJobsComponent} from './Employeer/posted-jobs/posted-jobs.component'
import {ApplicantListComponent} from './Employeer/applicant-list/applicant-list.component'
import {AllApplicantWiseJobsComponent} from './Employeer/all-applicant-wise-jobs/all-applicant-wise-jobs.component'
import {EmployerLoginComponent} from './Employeer/employer-login/employer-login.component'




import { authGuard } from './guards/auth.guard';





export const routes: Routes = [
     // { path: 'c', component: HomeComponent },
//================================App routs================================
     { path: '', component: HomeComponent},
     { path: 'login', component: LoginComponent },
     { path: 'register', component: RegisterComponent },
     { path: 'companyLogin', component: EmployerLoginComponent},
     // { path: 'company Regostration', component: Company Registration },
     { path: 'job/:id', component: JobDescriptionComponent },


//================================Candidate routs================================     
     { path: 'JsHome', component: CandidateHomeComponent, canActivate: [authGuard] },
     { path: 'JSProfile', component: CandidateProfileComponent, canActivate: [authGuard] },
     { path: 'applied-jobs', component: AppliedJobsComponent, canActivate: [authGuard] },
     { path: 'CandidateChangePass', component: CandidateChagepassComponent, canActivate: [authGuard] },
  
  
//================================Employer routs================================     

     { path: 'comapnyHome', component: CompanyHomeComponent, canActivate: [authGuard]},
     { path: 'postJob', component: PostJobComponent,canActivate: [authGuard] },
     { path: 'postedJobs', component: PostedJobsComponent, canActivate: [authGuard] },
     { path: 'allAllicantsofperticularjobd', component: ApplicantListComponent, canActivate: [authGuard]},
     { path: 'allJob', component: AllApplicantWiseJobsComponent,canActivate: [authGuard] },
     
  
     // { path: 'changePass', component: CandidateChagepassComponent},
     // { path: 'changePass', component: CandidateChagepassComponent},
     // { path: 'changePass', component: CandidateChagepassComponent},
     // { path: 'changePass', component: CandidateChagepassComponent},
     // { path: 'changePass', component: CandidateChagepassComponent},
     // { path: 'changePass', component: CandidateChagepassComponent},
     // { path: 'changePass', component: CandidateChagepassComponent},
     // { path: 'changePass', component: CandidateChagepassComponent},

     { path: 'notfound', component: NotFoundComponent },
];
