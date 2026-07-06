import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerCandidateViewComponent } from './employer-candidate-view.component';

describe('EmployerCandidateViewComponent', () => {
  let component: EmployerCandidateViewComponent;
  let fixture: ComponentFixture<EmployerCandidateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerCandidateViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerCandidateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
