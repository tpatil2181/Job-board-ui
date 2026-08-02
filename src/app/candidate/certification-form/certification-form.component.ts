import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CertificationEntry {
  id?: number;
  name: string;
  issuingOrg: string;
  issueMonth: string;
  issueYear: string;
  hasExpiry: boolean;
  expiryMonth: string;
  expiryYear: string;
  credentialId?: string;
  credentialUrl?: string;
}

@Component({
  selector: 'app-certification-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './certification-form.component.html',
  styleUrls: ['./certification-form.component.css']
})
export class CertificationFormComponent implements OnChanges {

  @Input() visible = false;
  @Input() editData: CertificationEntry | null = null;

  @Output() save = new EventEmitter<CertificationEntry>();
  @Output() close = new EventEmitter<void>();

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  years: string[] = [];

  form: CertificationEntry = this.emptyForm();

  constructor() {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear + 10; y >= currentYear - 40; y--) {
      this.years.push(String(y));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.form = this.editData ? { ...this.editData } : this.emptyForm();
    }
  }

  get isEditMode(): boolean {
    return !!this.editData;
  }

  emptyForm(): CertificationEntry {
    return {
      name: '',
      issuingOrg: '',
      issueMonth: '',
      issueYear: '',
      hasExpiry: false,
      expiryMonth: '',
      expiryYear: '',
      credentialId: '',
      credentialUrl: ''
    };
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onSave(form: any): void {
    if (form.invalid) {
      return;
    }
    this.save.emit({ ...this.form });
  }
}