import { Component } from '@angular/core';
import { SharedModule } from "../shared.module";

@Component({
  selector: 'app-new-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-home.component.html',
  styleUrl: './new-home.component.css'
})
export class NewHomeComponent {

}
