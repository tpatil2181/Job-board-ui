import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllApplicantWiseJobsComponent } from './all-applicant-wise-jobs.component';

describe('AllApplicantWiseJobsComponent', () => {
  let component: AllApplicantWiseJobsComponent;
  let fixture: ComponentFixture<AllApplicantWiseJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllApplicantWiseJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllApplicantWiseJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
