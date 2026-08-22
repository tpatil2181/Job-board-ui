import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  readonly aboutMaxLength = 500;

  /** Preview URL for the selected profile photo, if any. */
  photoPreviewUrl: string | null = null;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['Aditi Sharma', [Validators.required, Validators.maxLength(80)]],
      candidateTitle: ['Senior product designer', [Validators.maxLength(100)]],
      location: ['Pune, Maharashtra', [Validators.maxLength(100)]],
      about: [
        '',
        [Validators.maxLength(this.aboutMaxLength)],
      ],
    });
  }

  get aboutLength(): number {
    return this.form.get('about')?.value?.length ?? 0;
  }

  get initials(): string {
    const name: string = this.form.get('fullName')?.value ?? '';
    return name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onCancel(): void {
    this.form.reset({
      fullName: 'Aditi Sharma',
      candidateTitle: 'Senior product designer',
      location: 'Pune, Maharashtra',
      about: '',
    });
    this.photoPreviewUrl = null;
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Replace with a real save call (service/API) in your app.
    console.log('Profile saved', this.form.value, this.photoPreviewUrl);
  }
}