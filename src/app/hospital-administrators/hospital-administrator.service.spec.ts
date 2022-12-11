import {TestBed} from '@angular/core/testing';

import {HospitalAdministratorService} from './hospital-administrator.service';

describe('HospitalAdministratorService', () => {
  let service: HospitalAdministratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalAdministratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
