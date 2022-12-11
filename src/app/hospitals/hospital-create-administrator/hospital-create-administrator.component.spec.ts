import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HospitalCreateAdministratorComponent} from './hospital-create-administrator.component';

describe('HospitalCreateAdministratorComponent', () => {
  let component: HospitalCreateAdministratorComponent;
  let fixture: ComponentFixture<HospitalCreateAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalCreateAdministratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalCreateAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
