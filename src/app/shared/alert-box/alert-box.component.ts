// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
 
// export type AlertType = 'error' | 'success' | 'warning';
 
// @Component({
//   selector: 'app-alert-box',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './alert-box.component.html',
//   styleUrls: ['./alert-box.component.css']
// })
// export class AlertBoxComponent {
//   /** 'error' | 'success' | 'warning' — controls color and icon */
//   @Input() type: AlertType = 'error';
 
//   /** Bold headline text */
//   @Input() title = '';
 
//   /** Supporting description text */
//   @Input() message = '';
 
//   /** Set to false to hide the dismiss (✕) button */
//   @Input() dismissible = true;
 
//   /** Emits when the user clicks the ✕ button */
//   @Output() dismissed = new EventEmitter<void>();
 
//   get icon(): string {
//     switch (this.type) {
//       case 'success': return '✓';
//       case 'warning': return '!';
//       default: return '⚠️';
//     }
//   }
 
//   close(): void {
//     this.dismissed.emit();
//   }
// }
 


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service.service';

export type AlertType = 'error' | 'success' | 'warning';

@Component({
  selector: 'app-alert-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent implements OnInit {

  // Keep same variable names
  type: AlertType = 'error';

  title = '';

  message = '';

  dismissible = true;

  visible = false;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {

    this.alertService.alert$.subscribe(alert => {

      if (alert) {

        this.type = alert.type;

        this.title = alert.title;

        this.message = alert.message;

        this.dismissible = alert.dismissible;

        this.visible = true;

      } else {

        this.visible = false;

      }

    });

  }

  get icon(): string {

    switch (this.type) {

      case 'success':
        return '✓';

      case 'warning':
        return '!';

      default:
        return '⚠️';

    }

  }

  close(): void {

    this.alertService.clear();

  }

}