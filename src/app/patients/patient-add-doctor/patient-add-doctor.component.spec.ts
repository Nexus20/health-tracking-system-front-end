import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientAddDoctorComponent} from './patient-add-doctor.component';

describe('PatientAddDoctorComponent', () => {
  let component: PatientAddDoctorComponent;
  let fixture: ComponentFixture<PatientAddDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAddDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAddDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
