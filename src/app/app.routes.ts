import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CandidateHomeComponent } from './candidate/candidate-home/candidate-home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewHomeComponent } from './pages/new-home/new-home.component';
import { CandidateChagepassComponent } from './candidate/candidate-changepass/candidate-changepass.component';
import { CandidateProfileComponent } from './candidate/candidate-profile/candidate-profile.component';


export const routes: Routes = [
     { path: 'c', component: HomeComponent },

     { path: '', component: NewHomeComponent },
     { path: 'login', component: LoginComponent },
     { path: 'changePass', component: CandidateChagepassComponent},
     { path: 'register', component: RegisterComponent },
     { path: 'userHome', component: CandidateHomeComponent },
     { path: 'userProfile', component: CandidateProfileComponent },


     { path: 'notfound', component: NotFoundComponent },
];
