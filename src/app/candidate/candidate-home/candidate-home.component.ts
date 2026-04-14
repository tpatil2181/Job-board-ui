import { Component } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { JobCardComponent } from '../../components/job-card/job-card.component';
import { AppComponent } from "../../app.component"; // adjust path
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidate-home',
  standalone: true,
  imports: [CommonModule,SidebarComponent,FormsModule,NavbarComponent,JobCardComponent],
  templateUrl: './candidate-home.component.html',
  styleUrls: ['./candidate-home.component.css']
})
export class CandidateHomeComponent {

  searchText: string = '';
  location: string = '';

  jobs = [
  {
    title: 'Java Developer',
    company: 'Infosys',
    location: 'Pune',
    type: 'Full-time',
    experience: '2+ Years',
    mode: 'Hybrid',
    salary: '₹10 LPA'
  },
  {
    title: 'Angular Developer',
    company: 'TCS',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '1+ Years',
    mode: 'Remote',
    salary: '₹8 LPA'
  },
    {
    title: 'Angular Developer',
    company: 'TCS',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '1+ Years',
    mode: 'Remote',
    salary: '₹8 LPA'
  },
    {
    title: 'Angular Developer',
    company: 'TCS',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '1+ Years',
    mode: 'Remote',
    salary: '₹8 LPA'
  },
    {
    title: 'Angular Developer',
    company: 'TCS',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '1+ Years',
    mode: 'Remote',
    salary: '₹8 LPA'
  },
    {
    title: 'Angular Developer',
    company: 'TCS',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '1+ Years',
    mode: 'Remote',
    salary: '₹8 LPA'
  }
];

  searchJobs(){

  }

}
