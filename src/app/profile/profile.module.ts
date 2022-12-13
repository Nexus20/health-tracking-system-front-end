import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ProfileHospitalComponent} from './profile-hospital/profile-hospital.component';


@NgModule({
    declarations: [
        ProfileComponent,
        ProfileHospitalComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ProfileComponent
            }
        ]),
        SharedModule
    ]
})
export class ProfileModule {
}
