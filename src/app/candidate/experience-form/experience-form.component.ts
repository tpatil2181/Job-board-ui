import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ExperienceEntry {
  id?: number;
  title: string;
  company: string;
  location: string;
  workMode: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  currentlyWorking: boolean;
  description?: string;
}

@Component({
  selector: 'app-experience-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css']
})
export class ExperienceFormComponent implements OnChanges {

  @Input() visible = false;
  @Input() editData: ExperienceEntry | null = null;

  @Output() save = new EventEmitter<ExperienceEntry>();
  @Output() close = new EventEmitter<void>();

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  workModes = ['On-site', 'Hybrid', 'Remote'];

  years: string[] = [];

  form: ExperienceEntry = this.emptyForm();

  constructor() {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= currentYear - 50; y--) {
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

  emptyForm(): ExperienceEntry {
    return {
      title: '',
      company: '',
      location: '',
      workMode: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      currentlyWorking: false,
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