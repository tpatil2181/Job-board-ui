import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-company-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './company-sidebar.component.html',
  styleUrl: './company-sidebar.component.css'
})
export class CompanySidebarComponent {
  name: string = localStorage.getItem('name') || '';
  role: string = localStorage.getItem('role') || '';
  email: string = localStorage.getItem('email') || '';

}


