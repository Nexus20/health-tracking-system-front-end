import {TestBed} from '@angular/core/testing';

import {PatientCaretakerService} from './patient-caretaker.service';

describe('PatientCaretakerService', () => {
  let service: PatientCaretakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientCaretakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
