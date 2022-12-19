import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {ProfileState} from "../state/profile.state";
import {map} from "rxjs";
import {IPatientCaretakerResult} from "../../hospitals/models/IPatientCaretakerResult";
import {GetPatientCaretakerByPatientId} from "../../patient-caretakers/state/patient-caretaker.actions";
import {PatientCaretakerState} from "../../patient-caretakers/state/patient-caretaker.state";

@Component({
  selector: 'app-profile-patient-patient-caretaker',
  templateUrl: './profile-patient-patient-caretaker.component.html',
  styleUrls: ['./profile-patient-patient-caretaker.component.scss']
})
export class ProfilePatientPatientCaretakerComponent implements OnInit {

    @Input() patientId!: string;
    patientCaretakerId!: string;
    patientCaretakerInfo!: IPatientCaretakerResult;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.patientCaretakerId = this.store.selectSnapshot(ProfileState.selectPatientCaretakerId)!;
        if(this.patientCaretakerId !== null) {
            this.store.dispatch(new GetPatientCaretakerByPatientId(this.patientId)).pipe(
                map(() => this.store.selectSnapshot(PatientCaretakerState.selectPatientCaretakerById(this.patientCaretakerId)))
            ).subscribe(data => {
                this.patientCaretakerInfo = data;
                console.log("DOCTOR", data);
            });
        }
    }
}
