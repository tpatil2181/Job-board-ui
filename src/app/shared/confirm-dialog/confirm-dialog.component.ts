import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';

export type ConfirmVariant = 'danger' | 'primary';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  visible = false;

  variant: ConfirmVariant = 'danger';

  icon = '';

  title = 'Are you sure?';

  message = 'This action cannot be undone.';

  cancelLabel = 'Cancel';

  confirmLabel = 'Confirm';

  constructor(
    private confirmDialogService: ConfirmDialogService
  ) {}

  ngOnInit(): void {

    this.confirmDialogService.dialog$.subscribe(dialog => {

      if(dialog){

        this.visible = dialog.visible;
        this.variant = dialog.variant;
        this.icon = dialog.icon;
        this.title = dialog.title;
        this.message = dialog.message;
        this.cancelLabel = dialog.cancelLabel;
        this.confirmLabel = dialog.confirmLabel;

      }else{

        this.visible = false;

      }

    });

  }

  get resolvedIcon(): string {

    if(this.icon){
      return this.icon;
    }

    return this.variant === 'danger'
      ? '🗑️'
      : '❓';

  }

  onConfirm(): void {

    this.confirmDialogService.confirmAction();

  }

  onCancel(): void {

    this.confirmDialogService.cancelAction();

  }

  onOverlayClick(event: MouseEvent): void {

    if(event.target === event.currentTarget){

      this.onCancel();

    }

  }

}