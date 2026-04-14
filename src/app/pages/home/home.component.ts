import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
 imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  searchText: string = '';
  location: string = '';

  jobs = [
    { title: 'Java Developer', company: 'TCS', location: 'Pune' },
    { title: 'Angular Developer', company: 'Infosys', location: 'Mumbai' },
    { title: 'Spring Boot Developer', company: 'Wipro', location: 'Bangalore' }
  ];

  goHome() {
    console.log(this.searchText, this.location);
  }
}




