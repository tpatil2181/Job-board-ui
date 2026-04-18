import {Component} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-company.component.html',
  styleUrls: ['./login-company.component.css']
})
export class Playground {
  employer = {
    email: '',
    password: ''
  };

  login() {
    console.log('Login Company:', this.employer);
    // 👉 call backend API here
  }
}

bootstrapApplication(Playground);
