import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilePatientPatientCaretakerComponent} from './profile-patient-patient-caretaker.component';

describe('ProfilePatientPatientCaretakerComponent', () => {
  let component: ProfilePatientPatientCaretakerComponent;
  let fixture: ComponentFixture<ProfilePatientPatientCaretakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePatientPatientCaretakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePatientPatientCaretakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
