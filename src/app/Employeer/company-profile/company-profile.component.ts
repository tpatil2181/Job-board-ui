import { Component } from '@angular/core';
import { CompanySidebarComponent } from "../company-sidebar/company-sidebar.component";

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [CompanySidebarComponent],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent {

}
