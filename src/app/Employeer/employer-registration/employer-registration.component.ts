import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employer-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employer-registration.component.html',
  styleUrl: './employer-registration.component.css'
})
export class EmployerRegistrationComponent {

  employer = {
    name: '',
    email: '',
    password: ''
  };

  register() {
    console.log('Register Company:', this.employer);
    // 👉 call backend API here
  }
}

