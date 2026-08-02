import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface EducationEntry {
  id?: number;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  currentlyStudying: boolean;
  grade?: string;
  description?: string;
}

@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.css'
})
export class EducationFormComponent implements OnChanges {

  /** Controls whether the modal is rendered */
  @Input() visible = false;

  /** Pass an existing entry to edit; leave undefined/null to add a new one */
  @Input() editData: EducationEntry | null = null;

  /** Emits the saved education entry (create or update) */
  @Output() save = new EventEmitter<EducationEntry>();

  /** Emits when the user cancels/closes without saving */
  @Output() close = new EventEmitter<void>();

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  years: string[] = [];

  form: EducationEntry = this.emptyForm();

  constructor() {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear + 5; y >= currentYear - 60; y--) {
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

  emptyForm(): EducationEntry {
    return {
      school: '',
      degree: '',
      fieldOfStudy: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      currentlyStudying: false,
      grade: '',
      description: ''
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