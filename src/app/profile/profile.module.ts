import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ProfileHospitalComponent} from './profile-hospital/profile-hospital.component';
import {NgChartsModule} from "ng2-charts";
import {ProfileDoctorPatientsComponent} from './profile-doctor-patients/profile-doctor-patients.component';
import {ProfileHealthMeasurementsComponent} from './profile-health-measurements/profile-health-measurements.component';
import {ProfilePatientDoctorComponent} from './profile-patient-doctor/profile-patient-doctor.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
    declarations: [
        ProfileComponent,
        ProfileHospitalComponent,
        ProfileDoctorPatientsComponent,
        ProfileHealthMeasurementsComponent,
        ProfilePatientDoctorComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ProfileComponent
            }
        ]),
        SharedModule,
        NgChartsModule,
        TranslateModule
    ]
})
export class ProfileModule {
}
