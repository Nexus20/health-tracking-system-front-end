import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {IProfileResult} from "../models/IProfileResult";
import {ProfileState} from "../state/profile.state";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    profileInfo!: IProfileResult;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.profileInfo = this.store.selectSnapshot(ProfileState.selectProfile)!;
    }
}
