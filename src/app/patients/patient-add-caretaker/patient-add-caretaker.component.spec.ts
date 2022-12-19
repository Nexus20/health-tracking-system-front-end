import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientAddCaretakerComponent} from './patient-add-caretaker.component';

describe('PatientAddCaretakerComponent', () => {
  let component: PatientAddCaretakerComponent;
  let fixture: ComponentFixture<PatientAddCaretakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAddCaretakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAddCaretakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
