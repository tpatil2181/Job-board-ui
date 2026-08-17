import {Component,EventEmitter,Input,OnChanges,Output,SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// =====================================================
// Certification Interface
// =====================================================

export interface Certification {

  certificationId?: number;

  certificateName: string;

  issueingOrganization: string;

  smonth: string;

  syear: number;

  emonth: string | null;

  eyear: number | null;

  certiid?: number;

  certiurl?: string;

  candidateId?: number;
}


// =====================================================
// Component
// =====================================================

@Component({
  selector: 'app-certification-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './certification-form.component.html',
  styleUrls: ['./certification-form.component.css']
})
export class CertificationFormComponent implements OnChanges {


  // =====================================================
  // Inputs
  // =====================================================

  @Input() visible = false;

  @Input() editData: Certification | null = null;


  // =====================================================
  // Outputs
  // =====================================================

  @Output()
  save = new EventEmitter<Certification>();

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

  form: Certification = this.emptyForm();


  // =====================================================
  // Constructor
  // =====================================================

  constructor() {

    const currentYear = new Date().getFullYear();

    for (
      let y = currentYear + 10;
      y >= currentYear - 40;
      y--
    ) {

      this.years.push(y);

    }

  }


  // =====================================================
  // Detect Add / Edit
  // =====================================================

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['visible'] &&
      this.visible
    ) {

      if (this.editData) {

        // EDIT MODE
        this.form = {
          ...this.editData
        };

      } else {

        // ADD MODE
        this.form = this.emptyForm();

      }

    }

  }


  // =====================================================
  // Check Edit Mode
  // =====================================================

  get isEditMode(): boolean {

    return !!this.editData;

  }


  // =====================================================
  // Empty Form
  // =====================================================

  emptyForm(): Certification {

    return {

      certificationId: undefined,

      certificateName: '',

      issueingOrganization: '',

      smonth: '',

      syear: new Date().getFullYear(),

      emonth: null,

      eyear: null,

      certiid: undefined,

      certiurl: '',

      candidateId: undefined

    };

  }


  // =====================================================
  // Expiry Change
  // =====================================================

  onExpiryChange(): void {

    // If certification does not have expiry,
    // clear expiry date.

    if (
      this.form.emonth === null ||
      this.form.eyear === null
    ) {

      this.form.emonth = null;
      this.form.eyear = null;

    }

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


    // If there is no expiry,
    // explicitly send null.

    if (
      this.form.emonth === '' ||
      this.form.emonth === undefined
    ) {

      this.form.emonth = null;

    }

    if (
      this.form.eyear === undefined ||
      this.form.eyear === 0
    ) {

      this.form.eyear = null;

    }


    console.log(
      'Certification being saved:',
      this.form
    );


    this.save.emit({

      ...this.form

    });

  }

}



//=========================OLD CODE=========================================
// import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// export interface CertificationEntry {
//   id?: number;
//   name: string;
//   issuingOrg: string;
//   issueMonth: string;
//   issueYear: string;
//   hasExpiry: boolean;
//   expiryMonth: string;
//   expiryYear: string;
//   credentialId?: string;
//   credentialUrl?: string;
// }

// @Component({
//   selector: 'app-certification-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './certification-form.component.html',
//   styleUrls: ['./certification-form.component.css']
// })
// export class CertificationFormComponent implements OnChanges {

//   @Input() visible = false;
//   @Input() editData: CertificationEntry | null = null;

//   @Output() save = new EventEmitter<CertificationEntry>();
//   @Output() close = new EventEmitter<void>();

//   months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   years: string[] = [];

//   form: CertificationEntry = this.emptyForm();

//   constructor() {
//     const currentYear = new Date().getFullYear();
//     for (let y = currentYear + 10; y >= currentYear - 40; y--) {
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

//   emptyForm(): CertificationEntry {
//     return {
//       name: '',
//       issuingOrg: '',
//       issueMonth: '',
//       issueYear: '',
//       hasExpiry: false,
//       expiryMonth: '',
//       expiryYear: '',
//       credentialId: '',
//       credentialUrl: ''
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