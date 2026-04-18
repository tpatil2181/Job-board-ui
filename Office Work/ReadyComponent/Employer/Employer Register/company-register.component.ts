import {Component} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class Playground {
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


