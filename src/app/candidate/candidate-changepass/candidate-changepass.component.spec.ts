import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateChagepassComponent } from './candidate-changepass.component';

describe('CandidateChagepassComponent', () => {
  let component: CandidateChagepassComponent;
  let fixture: ComponentFixture<CandidateChagepassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateChagepassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateChagepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
