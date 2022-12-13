import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileHospitalComponent} from './profile-hospital.component';

describe('ProfileHospitalComponent', () => {
  let component: ProfileHospitalComponent;
  let fixture: ComponentFixture<ProfileHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileHospitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
