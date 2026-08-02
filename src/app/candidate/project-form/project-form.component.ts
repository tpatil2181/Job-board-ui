import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ProjectEntry {
  id?: number;
  title: string;
  role?: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  ongoing: boolean;
  description: string;
  projectUrl?: string;
}

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnChanges {

  @Input() visible = false;
  @Input() editData: ProjectEntry | null = null;

  @Output() save = new EventEmitter<ProjectEntry>();
  @Output() close = new EventEmitter<void>();

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  years: string[] = [];

  form: ProjectEntry = this.emptyForm();

  constructor() {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= currentYear - 30; y--) {
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

  emptyForm(): ProjectEntry {
    return {
      title: '',
      role: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      ongoing: false,
      description: '',
      projectUrl: ''
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