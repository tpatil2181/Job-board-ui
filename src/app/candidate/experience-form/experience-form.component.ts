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


// ================================
// Experience Interface
// ================================

export interface Experience {

  candExpId?: number;

  candidateId?: number;

  companyName: string;

  jobTitle: string;

  location: string;

  workMode: string;

  smonth: string;

  syear: number;

  // emonth?: string;

  // eyear?: number;

  emonth: string | null;
  eyear: number | null;

  isCurrentCompanny: boolean;

  aboutJobProfile: string;
}




@Component({
  selector: 'app-experience-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css']
})
export class ExperienceFormComponent implements OnChanges {


  // ================================
  // Inputs
  // ================================

  @Input() visible = false;

  @Input() editData: Experience | null = null;


  // ================================
  // Outputs
  // ================================

  @Output()
  save = new EventEmitter<Experience>();

  @Output()
  close = new EventEmitter<void>();


  // ================================
  // Dropdown values
  // ================================

  // months = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December'
  // ];


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

  workModes = [
    'ONSITE',
    'HYBRID',
    'REMOTE'
  ];


  years: number[] = [];


  // ================================
  // Form
  // ================================

  form: Experience = this.emptyForm();


  // ================================
  // Constructor
  // ================================

  constructor() {

    const currentYear = new Date().getFullYear();

    for (
      let y = currentYear;
      y >= currentYear - 50;
      y--
    ) {

      this.years.push(y);

    }

  }


  // ================================
  // Detect Add / Edit
  // ================================

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['visible'] &&
      this.visible
    ) {

      if (this.editData) {

        // EDIT

        this.form = {
          ...this.editData
        };

      } else {

        // ADD

        this.form = this.emptyForm();

      }

    }

  }


  // ================================
  // Edit mode
  // ================================

  get isEditMode(): boolean {

    return !!this.editData;

  }


  // ================================
  // Empty form
  // ================================

  emptyForm(): Experience {

    return {

      candExpId: undefined,

      candidateId: undefined,

      companyName: '',

      jobTitle: '',

      location: '',

      workMode: '',

      smonth: '',

      syear: new Date().getFullYear(),

      emonth: null,

      eyear: null,

      isCurrentCompanny: false,

      aboutJobProfile: ''

    };

  }

  onCurrentCompanyChange(): void {

  if (this.form.isCurrentCompanny) {

    this.form.emonth = null;
    this.form.eyear = null;

  }

}


  // ================================
  // Overlay click
  // ================================

  onOverlayClick(event: MouseEvent): void {

    if (
      event.target === event.currentTarget
    ) {

      this.onClose();

    }

  }


  // ================================
  // Close
  // ================================

  onClose(): void {

    this.close.emit();

  }


  // ================================
  // Save
  // ================================

  onSave(form: any): void {

    if (form.invalid) {

      return;

    }


    // If currently working,
    // ending date is not required.

    if (this.form.isCurrentCompanny) {

    this.form.emonth = null;
    this.form.eyear = null;

  }


    this.save.emit({

      ...this.form

    });

  }

}

//==============================OLD COEDE==============================

// import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// export interface ExperienceEntry {
//   id?: number;
//   title: string;
//   company: string;
//   location: string;
//   workMode: string;
//   startMonth: string;
//   startYear: string;
//   endMonth: string;
//   endYear: string;
//   currentlyWorking: boolean;
//   description?: string;
// }

// @Component({
//   selector: 'app-experience-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './experience-form.component.html',
//   styleUrls: ['./experience-form.component.css']
// })
// export class ExperienceFormComponent implements OnChanges {

//   @Input() visible = false;
//   @Input() editData: ExperienceEntry | null = null;

//   @Output() save = new EventEmitter<ExperienceEntry>();
//   @Output() close = new EventEmitter<void>();

//   months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   workModes = ['On-site', 'Hybrid', 'Remote'];

//   years: string[] = [];

//   form: ExperienceEntry = this.emptyForm();

//   constructor() {
//     const currentYear = new Date().getFullYear();
//     for (let y = currentYear; y >= currentYear - 50; y--) {
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

//   emptyForm(): ExperienceEntry {
//     return {
//       title: '',
//       company: '',
//       location: '',
//       workMode: '',
//       startMonth: '',
//       startYear: '',
//       endMonth: '',
//       endYear: '',
//       currentlyWorking: false,
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