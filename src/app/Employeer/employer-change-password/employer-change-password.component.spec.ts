import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerChangePasswordComponent } from './employer-change-password.component';

describe('EmployerChangePasswordComponent', () => {
  let component: EmployerChangePasswordComponent;
  let fixture: ComponentFixture<EmployerChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerChangePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
