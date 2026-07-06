import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  name: string = localStorage.getItem('name') || '';
  role: string = localStorage.getItem('role') || '';
  email: string = localStorage.getItem('email') || '';
  //  user = {
  //   name: 'Tushar Patil',
  //   role: 'Candidate',
  //   email: 'tushar@gmail.com'
  // };

}

