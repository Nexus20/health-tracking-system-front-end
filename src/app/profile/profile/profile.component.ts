import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {IProfileResult} from "../models/IProfileResult";
import {ProfileState} from "../state/profile.state";
import {AuthState} from "../../users/states/auth.state";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    profileInfo!: IProfileResult;
    hospitalId?: string;
    doctorId?: string;
    patientId?: string;
    isUserHospitalAdmin: boolean = false;
    isUserDoctor: boolean = false;
    isUserPatient: boolean = false;

    constructor(private store: Store) {
    }

    // https://localhost:7088/health-measurements

    ngOnInit(): void {

        this.profileInfo = this.store.selectSnapshot(ProfileState.selectProfile)!;
        this.isUserHospitalAdmin = this.store.selectSnapshot(AuthState.hospitalAdministratorId) !== undefined;

        if (this.isUserHospitalAdmin) {
            this.hospitalId = this.store.selectSnapshot(ProfileState.selectAdministratorHospitalId);
        }

        this.isUserDoctor = this.store.selectSnapshot(AuthState.doctorId) !== undefined;

        if(this.isUserDoctor) {
            this.hospitalId = this.store.selectSnapshot(ProfileState.selectDoctorHospitalId);
            this.doctorId = this.store.selectSnapshot(AuthState.doctorId);
        }

        const patientId = this.store.selectSnapshot(AuthState.patientId);
        if(patientId !== undefined) {
            this.isUserPatient = true;
            this.patientId = patientId;
            this.hospitalId = this.store.selectSnapshot(ProfileState.selectPatientHospitalId);
        }
    }
}
