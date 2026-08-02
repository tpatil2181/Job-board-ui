import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ConfirmVariant } from '../shared/confirm-dialog/confirm-dialog.component';

export interface ConfirmDialogData {

  visible: boolean;

  variant: ConfirmVariant;

  icon: string;

  title: string;

  message: string;

  cancelLabel: string;

  confirmLabel: string;

}

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  private dialogSubject =
    new BehaviorSubject<ConfirmDialogData | null>(null);

  dialog$ = this.dialogSubject.asObservable();

  private result!: Subject<boolean>;

  confirm(options: Partial<ConfirmDialogData>): Observable<boolean> {

    this.result = new Subject<boolean>();

    this.dialogSubject.next({

      visible: true,

      variant: options.variant ?? 'danger',

      icon: options.icon ?? '',

      title: options.title ?? 'Are you sure?',

      message: options.message ?? '',

      cancelLabel: options.cancelLabel ?? 'Cancel',

      confirmLabel: options.confirmLabel ?? 'Confirm'

    });

    return this.result.asObservable();

  }

  confirmAction() {

    this.result.next(true);

    this.result.complete();

    this.close();

  }

  cancelAction() {

    this.result.next(false);

    this.result.complete();

    this.close();

  }

  close() {

    this.dialogSubject.next(null);

  }

}