import {Component, Input, OnInit} from '@angular/core';
import {IPatientResult} from "../../hospitals/models/IPatientResult";
import {Store} from "@ngxs/store";
import {GetPatientsByCaretakerId} from "../../patients/state/patient.actions";
import {map} from "rxjs";
import {PatientState} from "../../patients/state/patient.state";

@Component({
  selector: 'app-profile-patient-caretaker-patients',
  templateUrl: './profile-patient-caretaker-patients.component.html',
  styleUrls: ['./profile-patient-caretaker-patients.component.scss']
})
export class ProfilePatientCaretakerPatientsComponent implements OnInit {

    @Input() patientCaretakerId!: string;
    patients!: IPatientResult[];

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.store.dispatch(new GetPatientsByCaretakerId(this.patientCaretakerId!)).pipe(
            map(() => this.store.selectSnapshot(PatientState.selectPatientsByCaretakerId(this.patientCaretakerId!)))
        ).subscribe(returnData => {
            this.patients = returnData;
        })
    }
}
