import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSearchHomeComponent } from './job-search-home.component';

describe('JobSearchHomeComponent', () => {
  let component: JobSearchHomeComponent;
  let fixture: ComponentFixture<JobSearchHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSearchHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSearchHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
