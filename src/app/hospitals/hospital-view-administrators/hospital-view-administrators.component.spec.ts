import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HospitalViewAdministratorsComponent} from './hospital-view-administrators.component';

describe('HospitalViewAdministratorsComponent', () => {
  let component: HospitalViewAdministratorsComponent;
  let fixture: ComponentFixture<HospitalViewAdministratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalViewAdministratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalViewAdministratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
