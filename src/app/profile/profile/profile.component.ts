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
    isHospitalAdmin: boolean = false;
    // hospitalInfo?: IHospitalResult;

    constructor(private store: Store) {
    }

    ngOnInit(): void {

        this.profileInfo = this.store.selectSnapshot(ProfileState.selectProfile)!;
        this.isHospitalAdmin = this.store.selectSnapshot(AuthState.hospitalAdministratorId) !== undefined;

        if(this.isHospitalAdmin) {
            this.hospitalId = this.store.selectSnapshot(ProfileState.selectAdministratorHospitalId);


        }
    }
}
