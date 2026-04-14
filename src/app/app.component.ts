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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NotFoundComponent, SidebarComponent, CandidateHomeComponent, LoginComponent, RegisterComponent, SharedModule, CandidateChagepassComponent, CandidateProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'job-board-app-frontend';
}
