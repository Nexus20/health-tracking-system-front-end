import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAdministratorEditComponent } from './hospital-administrator-edit.component';

describe('HospitalAdministratorEditComponent', () => {
  let component: HospitalAdministratorEditComponent;
  let fixture: ComponentFixture<HospitalAdministratorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalAdministratorEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalAdministratorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
