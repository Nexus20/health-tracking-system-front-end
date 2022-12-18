import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {IPatientResult} from "../../hospitals/models/IPatientResult";
import {map} from "rxjs";
import {GetPatientsByDoctorId} from "../../patients/state/patient.actions";
import {PatientState} from "../../patients/state/patient.state";

@Component({
    selector: 'app-profile-doctor-patients',
    templateUrl: './profile-doctor-patients.component.html',
    styleUrls: ['./profile-doctor-patients.component.scss']
})
export class ProfileDoctorPatientsComponent implements OnInit {

    @Input() doctorId!: string;
    patients!: IPatientResult[];

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.store.dispatch(new GetPatientsByDoctorId(this.doctorId!)).pipe(
            map(() => this.store.selectSnapshot(PatientState.selectPatientsByDoctorId(this.doctorId!)))
        ).subscribe(returnData => {
            this.patients = returnData;
        })
    }
}
