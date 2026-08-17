import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Use the Education interface from your shared candidate interface file
import { Education } from '../../Interface/Canditate/candidate';


@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.css'
})
export class EducationFormComponent implements OnChanges {

  // =====================================================
  // Inputs
  // =====================================================

  @Input() visible = false;

  @Input() editData: Education | null = null;


  // =====================================================
  // Outputs
  // =====================================================

  @Output()
  save = new EventEmitter<Education>();

  @Output()
  close = new EventEmitter<void>();


  // =====================================================
  // Dropdown values
  // =====================================================

months =[
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER'
  ];

  years: number[] = [];


  // =====================================================
  // Form
  // =====================================================

  form: Education = this.emptyForm();


  // =====================================================
  // Constructor
  // =====================================================

  constructor() {

    const currentYear = new Date().getFullYear();

    for (
      let y = currentYear + 5;
      y >= currentYear - 60;
      y--
    ) {

      this.years.push(y);

    }

  }


  // =====================================================
  // Add / Edit mode
  // =====================================================

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['visible'] &&
      this.visible
    ) {

      this.form = this.editData
        ? { ...this.editData }
        : this.emptyForm();

    }

  }


  // =====================================================
  // Check edit mode
  // =====================================================

  get isEditMode(): boolean {

    return !!this.editData;

  }


  // =====================================================
  // Empty form
  // =====================================================

  emptyForm(): Education {

    return {

      educationId: undefined,

      degree: '',

      college: '',

      fieldOfStudy:'',
      
      smonth: '',

      syear: new Date().getFullYear(),

      emonth: null,

      eyear: null,

      isCurrentlystudying: false,

      percentage: 0,

      candidateId: undefined

    };

  }


  // =====================================================
  // Currently studying change
  // =====================================================

  onCurrentlyStudyingChange(): void {

    if (this.form.isCurrentlystudying) {

      this.form.emonth = null;

      this.form.eyear = null;

    }

  }


  // =====================================================
  // Overlay click
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


    // If currently studying,
    // explicitly send null for ending date.

    if (this.form.isCurrentlystudying) {

      this.form.emonth = null;

      this.form.eyear = null;

    }


    // Convert empty expiry values to null

    if (
      this.form.emonth === ''
    ) {

      this.form.emonth = null;

    }

    if (
      this.form.eyear === 0 ||
      this.form.eyear === undefined
    ) {

      this.form.eyear = null;

    }


    console.log(
      'Education being saved:',
      this.form
    );


    this.save.emit({
      ...this.form
    });

  }

}






//=============================Old Code============================================
// import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// export interface EducationEntry {
//   id?: number;
//   school: string;
//   degree: string;
//   fieldOfStudy: string;
//   startMonth: string;
//   startYear: string;
//   endMonth: string;
//   endYear: string;
//   currentlyStudying: boolean;
//   grade?: string;
//   description?: string;
// }

// @Component({
//   selector: 'app-education-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './education-form.component.html',
//   styleUrl: './education-form.component.css'
// })
// export class EducationFormComponent implements OnChanges {

//   /** Controls whether the modal is rendered */
//   @Input() visible = false;

//   /** Pass an existing entry to edit; leave undefined/null to add a new one */
//   @Input() editData: EducationEntry | null = null;

//   /** Emits the saved education entry (create or update) */
//   @Output() save = new EventEmitter<EducationEntry>();

//   /** Emits when the user cancels/closes without saving */
//   @Output() close = new EventEmitter<void>();

//   months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   years: string[] = [];

//   form: EducationEntry = this.emptyForm();

//   constructor() {
//     const currentYear = new Date().getFullYear();
//     for (let y = currentYear + 5; y >= currentYear - 60; y--) {
//       this.years.push(String(y));
//     }
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['visible'] && this.visible) {
//       this.form = this.editData ? { ...this.editData } : this.emptyForm();
//     }
//   }

//   get isEditMode(): boolean {
//     return !!this.editData;
//   }

//   emptyForm(): EducationEntry {
//     return {
//       school: '',
//       degree: '',
//       fieldOfStudy: '',
//       startMonth: '',
//       startYear: '',
//       endMonth: '',
//       endYear: '',
//       currentlyStudying: false,
//       grade: '',
//       description: ''
//     };
//   }

//   onOverlayClick(event: MouseEvent): void {
//     if (event.target === event.currentTarget) {
//       this.onClose();
//     }
//   }

//   onClose(): void {
//     this.close.emit();
//   }

//   onSave(form: any): void {
//     if (form.invalid) {
//       return;
//     }
//     this.save.emit({ ...this.form });
//   }
// }