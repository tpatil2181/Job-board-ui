import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnumFormatPipe } from '../../shared/pipes/enum-format.pipe';

export interface LanguageEntry {
  langId?: number;
  language: string;
  proficiency: string;
  candidateId?: number;
}

@Component({
  selector: 'app-language-form',
  standalone: true,
  imports: [CommonModule, FormsModule,EnumFormatPipe],
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.css']
})
export class LanguageFormComponent implements OnChanges {

  @Input() visible = false;
  @Input() editData: LanguageEntry | null = null;

  @Output() save = new EventEmitter<LanguageEntry>();
  @Output() close = new EventEmitter<void>();

  levels: LanguageEntry['proficiency'][] = ['BASIC', 'CONVERSATIONAL', 'PROFESSIONAL', 'NATIVE'];

  form: LanguageEntry = this.emptyForm();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.form = this.editData ? { ...this.editData } : this.emptyForm();
    }
  }

  get isEditMode(): boolean {
    return !!this.editData;
  }

  emptyForm(): LanguageEntry {
    return {
      language: '',
      proficiency: 'CONVERSATIONAL'
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