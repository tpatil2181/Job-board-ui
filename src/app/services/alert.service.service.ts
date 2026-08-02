import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertType } from '../shared/alert-box/alert-box.component';

export interface Alert {

  type: AlertType;

  title: string;

  message: string;

  dismissible: boolean;

}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSubject =
      new BehaviorSubject<Alert | null>(null);

  alert$ = this.alertSubject.asObservable();

  success(message: string, title = 'Success') {

    this.show({
      type: 'success',
      title,
      message,
      dismissible: true
    });

  }

  error(message: string, title = 'Error') {

    this.show({
      type: 'error',
      title,
      message,
      dismissible: true
    });

  }

  warning(message: string, title = 'Warning') {

    this.show({
      type: 'warning',
      title,
      message,
      dismissible: true
    });

  }

  show(alert: Alert) {

    this.alertSubject.next(alert);

    setTimeout(() => {

      this.clear();

    }, 3000);

  }

  clear() {

    this.alertSubject.next(null);

  }

}