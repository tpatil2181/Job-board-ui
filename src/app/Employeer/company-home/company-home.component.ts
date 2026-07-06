import { Component } from '@angular/core';
import { CompanySidebarComponent } from "../company-sidebar/company-sidebar.component";

@Component({
  selector: 'app-company-home',
  standalone: true,
  imports: [CompanySidebarComponent],
  templateUrl: './company-home.component.html',
  styleUrl: './company-home.component.css'
})
export class CompanyHomeComponent {

}
