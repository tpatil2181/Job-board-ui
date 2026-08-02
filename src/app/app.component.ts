import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { CandidateHomeComponent } from "./candidate/candidate-home/candidate-home.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { SharedModule } from "./pages/shared.module";
import { CandidateChagepassComponent } from "./candidate/candidate-changepass/candidate-changepass.component";
import { CandidateProfileComponent } from "./candidate/candidate-profile/candidate-profile.component";
import { AppliedJobsComponent } from "./candidate/applied-jobs/applied-jobs.component";
import { JobBoardComponent } from "./pages/job-board/job-board.component";
import { EmployerLoginComponent } from "./Employeer/employer-login/employer-login.component";
import { EmployerRegistrationComponent } from "./Employeer/employer-registration/employer-registration.component";
import { ApplicantListComponent } from "./Employeer/applicant-list/applicant-list.component";
import { PostedJobsComponent } from "./Employeer/posted-jobs/posted-jobs.component";
import { PostJobComponent } from "./Employeer/post-job/post-job.component";
import { EmployerCandidateViewComponent } from "./Employeer/employer-candidate-view/employer-candidate-view.component";
import { LoaderComponent } from "./shared/loader/loader.component";
import { AlertBoxComponent } from "./shared/alert-box/alert-box.component";
import { ConfirmDialogComponent } from "./shared/confirm-dialog/confirm-dialog.component";
// import { HireFlowHomepageComponent } from "./pages/hire-flow-homepage/hire-flow-homepage.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NotFoundComponent, SidebarComponent, CandidateHomeComponent, LoginComponent, RegisterComponent, SharedModule, CandidateChagepassComponent, CandidateProfileComponent, AppliedJobsComponent, JobBoardComponent, EmployerLoginComponent, EmployerRegistrationComponent, ApplicantListComponent, PostedJobsComponent, PostJobComponent, EmployerCandidateViewComponent, LoaderComponent, AlertBoxComponent, ConfirmDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'job-board-app-frontend';
}
