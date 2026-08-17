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

import { Project } from '../../Interface/Canditate/candidate';


@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnChanges {

  // =====================================================
  // Inputs
  // =====================================================

  @Input() visible = false;

  @Input() editData: Project | null = null;


  // =====================================================
  // Outputs
  // =====================================================

  @Output()
  save = new EventEmitter<Project>();

  @Output()
  close = new EventEmitter<void>();


  // =====================================================
  // Dropdown values
  // =====================================================

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


  years: number[] = [];


  // =====================================================
  // Form
  // =====================================================

  form: Project = this.emptyForm();


  // =====================================================
  // Constructor
  // =====================================================

  constructor() {

    const currentYear = new Date().getFullYear();

    for (
      let y = currentYear;
      y >= currentYear - 30;
      y--
    ) {

      this.years.push(y);

    }

  }


  // =====================================================
  // Add / Edit
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
  // Edit mode
  // =====================================================

  get isEditMode(): boolean {

    return !!this.editData;

  }


  // =====================================================
  // Empty form
  // =====================================================

  emptyForm(): Project {

    return {

      projectId: undefined,

      ProjectTitle: '',

      role: '',

      FieldOfStudy: '',

      smonth: '',

      syear: new Date().getFullYear(),

      emonth: null,

      eyear: null,

      isOngoing: false,

      discription: '',

      casestudyurl: '',

      candidateId: undefined

    };

  }


  // =====================================================
  // Ongoing project change
  // =====================================================

  onOngoingChange(): void {

    if (this.form.isOngoing) {

      this.form.emonth = null;

      this.form.eyear = null;

    }

  }


  // =====================================================
  // Overlay
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


    // Ongoing project has no end date

    if (this.form.isOngoing) {

      this.form.emonth = null;

      this.form.eyear = null;

    }


    // Convert empty values to null

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
      'Project being saved:',
      this.form
    );


    this.save.emit({
      ...this.form
    });

  }

}