import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatientsComponent} from './patients/patients.component';
import {PatientViewComponent} from './patient-view/patient-view.component';
import {PatientCreateComponent} from './patient-create/patient-create.component';
import {PatientEditComponent} from './patient-edit/patient-edit.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {PatientsResolver} from "./resolvers/patients.resolver";
import {PatientResolver} from "./resolvers/patient.resolver";
import {NgChartsModule} from "ng2-charts";
import {PatientAddDoctorComponent} from './patient-add-doctor/patient-add-doctor.component';
import {DoctorsResolver} from "../doctors/resolvers/doctors.resolver";
import {MatSelectModule} from "@angular/material/select";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
    declarations: [
        PatientsComponent,
        PatientViewComponent,
        PatientCreateComponent,
        PatientEditComponent,
        PatientAddDoctorComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: PatientsComponent,
                resolve: {
                    patients: PatientsResolver
                }
            },
            {
                path: 'create',
                component: PatientCreateComponent,
            },
            {
                path: ':id',
                component: PatientViewComponent,
                resolve: {
                    patient: PatientResolver
                }
            },
            {
                path: ':id/edit',
                component: PatientEditComponent,
                resolve: {
                    patient: PatientResolver
                }
            },
            {
                path: ':id/add-doctor',
                component: PatientAddDoctorComponent,
                resolve: {
                    patient: PatientResolver,
                    doctors: DoctorsResolver
                }
            }
        ]),
        SharedModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        NgChartsModule,
        MatSelectModule,
        TranslateModule
    ],
    providers: [PatientsResolver, PatientResolver, DoctorsResolver]
})
export class PatientsModule {
}
