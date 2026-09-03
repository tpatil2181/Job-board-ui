import { Component } from '@angular/core';
import { CompanySidebarComponent } from "../company-sidebar/company-sidebar.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-company-home',
  standalone: true,
  imports: [CompanySidebarComponent, RouterModule],
  templateUrl: './company-home.component.html',
  styleUrl: './company-home.component.css'
})
export class CompanyHomeComponent {


  sidebarOpen = true;

    toggleSidebar(): void {
      this.sidebarOpen = !this.sidebarOpen;
    }
}
