import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHealthMeasurementsComponent } from './profile-health-measurements.component';

describe('ProfileHealthMeasurementsComponent', () => {
  let component: ProfileHealthMeasurementsComponent;
  let fixture: ComponentFixture<ProfileHealthMeasurementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileHealthMeasurementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileHealthMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
