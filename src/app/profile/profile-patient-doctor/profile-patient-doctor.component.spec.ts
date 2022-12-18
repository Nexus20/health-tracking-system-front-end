import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilePatientDoctorComponent} from './profile-patient-doctor.component';

describe('ProfilePatientDoctorComponent', () => {
  let component: ProfilePatientDoctorComponent;
  let fixture: ComponentFixture<ProfilePatientDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePatientDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePatientDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
