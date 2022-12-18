import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDoctorPatientsComponent } from './profile-doctor-patients.component';

describe('ProfileDoctorPatientsComponent', () => {
  let component: ProfileDoctorPatientsComponent;
  let fixture: ComponentFixture<ProfileDoctorPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDoctorPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDoctorPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
