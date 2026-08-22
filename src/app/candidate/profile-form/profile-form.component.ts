import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// =====================================================
// Fields this form edits, drawn straight from Candidate.
// (Candidate has no `location` field, so it isn't included
// here — add it to Candidate first if you want to edit it.)
// =====================================================

export interface CandidateProfileEdit {

  candidateId?: number;

  firstName: string;

  lastName: string;

  mobNo: string;

  contactEmail:string;

  candidateTitle: string | null;

  candidateAbout: string | null;

  imageId: number | null;

}


// =====================================================
// What gets emitted on save.
// imageFile is the newly picked photo (if any) — upload it
// via your image endpoint first to get a fresh imageId,
// or send it alongside `profile` if your API accepts
// multipart form data in one call.
// =====================================================

export interface CandidateProfileSaveEvent {

  profile: CandidateProfileEdit;

  imageFile: File | null;

}


// =====================================================
// Component
// =====================================================

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnChanges {


  // =====================================================
  // Inputs
  // =====================================================

  @Input() visible = false;

  @Input() editData: CandidateProfileEdit | null = null;

  // Base URL used to resolve `imageId` into a viewable photo
  // (e.g. '/api/images/'). Leave blank if you resolve it
  // before passing editData in.
  @Input() imageBaseUrl = '';


  // =====================================================
  // Outputs
  // =====================================================

  @Output()
  save = new EventEmitter<CandidateProfileSaveEvent>();

  @Output()
  close = new EventEmitter<void>();


  // =====================================================
  // Form
  // =====================================================

  form: CandidateProfileEdit = this.emptyForm();

  readonly aboutMaxLength = 500;

  // Transient photo state — not part of Candidate itself
  imageFile: File | null = null;
  imagePreviewUrl: string | null = null;


  // =====================================================
  // Load existing candidate data whenever the modal opens
  // =====================================================

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['visible'] &&
      this.visible
    ) {

      if (this.editData) {

        this.form = {
          candidateId: this.editData.candidateId,
          firstName: this.editData.firstName ?? '',
          lastName: this.editData.lastName ?? '',
          mobNo: this.editData.mobNo ??'',
          contactEmail:this.editData.contactEmail,
          candidateTitle: this.editData.candidateTitle ?? '',
          candidateAbout: this.editData.candidateAbout ?? '',
          imageId: this.editData.imageId ?? null
        };

        this.imagePreviewUrl = this.editData.imageId
          ? `${this.imageBaseUrl}${this.editData.imageId}`
          : null;

        this.imageFile = null;

      } else {

        this.form = this.emptyForm();
        this.imagePreviewUrl = null;
        this.imageFile = null;

      }

    }

  }


  // =====================================================
  // Empty Form
  // =====================================================

  emptyForm(): CandidateProfileEdit {

    return {

      candidateId: undefined,

      firstName: '',

      lastName: '',

      mobNo: '',

      contactEmail:'',

      candidateTitle: '',

      candidateAbout: '',

      imageId: null

    };

  }


  // =====================================================
  // Initials fallback for the avatar
  // =====================================================

  get initials(): string {

    const first = (this.form.firstName || '').trim();
    const last = (this.form.lastName || '').trim();

    return `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase();

  }


  // =====================================================
  // Photo Upload
  // =====================================================

  onPhotoSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.imageFile = file;

    const reader = new FileReader();

    reader.onload = () => {

      this.imagePreviewUrl = reader.result as string;

    };

    reader.readAsDataURL(file);

  }


  // =====================================================
  // Overlay Click
  // =====================================================

  onOverlayClick(event: MouseEvent): void {

    if (
      event.target === event.currentTarget
    ) {

      this.onClose();

    }

  }


  // =====================================================
  // Close
  // =====================================================

  onClose(): void {

    this.close.emit();

  }


  // =====================================================
  // Save
  // =====================================================

  onSave(form: any): void {

    if (form.invalid) {

      return;

    }

    console.log(
      'Profile being saved:',
      this.form,
      this.imageFile
    );

    this.save.emit({

      profile: { ...this.form },

      imageFile: this.imageFile

    });

  }

}