import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HospitalAdministratorViewComponent} from './hospital-administrator-view.component';

describe('HospitalAdministratorViewComponent', () => {
  let component: HospitalAdministratorViewComponent;
  let fixture: ComponentFixture<HospitalAdministratorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalAdministratorViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalAdministratorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
