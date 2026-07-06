import { Component,Input  } from '@angular/core';

@Component({
  selector: 'app-job-search-home',
  standalone: true,
  imports: [],
  templateUrl: './job-search-home.component.html',
  styleUrl: './job-search-home.component.css'
})
export class JobSearchHomeComponent {

  @Input() job: any;

  isSaved = false;

  viewJob(id: number) {
    console.log('Navigate to job details:', id);
  }

  toggleSave() {
    this.isSaved = !this.isSaved;
  }

}
