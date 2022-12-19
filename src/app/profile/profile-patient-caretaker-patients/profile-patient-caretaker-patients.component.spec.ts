import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilePatientCaretakerPatientsComponent} from './profile-patient-caretaker-patients.component';

describe('ProfilePatientCaretakerPatientsComponent', () => {
  let component: ProfilePatientCaretakerPatientsComponent;
  let fixture: ComponentFixture<ProfilePatientCaretakerPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePatientCaretakerPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePatientCaretakerPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
