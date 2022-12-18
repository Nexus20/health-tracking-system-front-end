import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {ProfileState} from "../state/profile.state";
import {IDoctorResult} from "../../hospitals/models/IDoctorResult";
import {GetDoctorById} from "../../doctors/state/doctor.actions";
import {map} from "rxjs";
import {DoctorState} from "../../doctors/state/doctor.state";

@Component({
  selector: 'app-profile-patient-doctor',
  templateUrl: './profile-patient-doctor.component.html',
  styleUrls: ['./profile-patient-doctor.component.scss']
})
export class ProfilePatientDoctorComponent implements OnInit {

    @Input() patientId!: string;
    patientDoctorId!: string;
    patientDoctorInfo!: IDoctorResult;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.patientDoctorId = this.store.selectSnapshot(ProfileState.selectPatientDoctorId)!;
        if(this.patientDoctorId !== null) {
            this.store.dispatch(new GetDoctorById(this.patientDoctorId)).pipe(
                map(() => this.store.selectSnapshot(DoctorState.selectDoctorById(this.patientDoctorId)))
            ).subscribe(data => {
                console.log("DOCTOR", data);
            });
        }
    }
}
