import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DoctorsComponent} from './doctors/doctors.component';
import {DoctorViewComponent} from './doctor-view/doctor-view.component';
import {DoctorCreateComponent} from './doctor-create/doctor-create.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {DoctorsResolver} from "./resolvers/doctors.resolver";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DoctorResolver} from "./resolvers/doctor.resolver";
import {DoctorEditComponent} from './doctor-edit/doctor-edit.component';


@NgModule({
    declarations: [
        DoctorsComponent,
        DoctorViewComponent,
        DoctorCreateComponent,
        DoctorEditComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: DoctorsComponent,
                resolve: {
                    doctors: DoctorsResolver
                }
            },
            {
                path: 'create',
                component: DoctorCreateComponent,
            },
            {
                path: ':id',
                component: DoctorViewComponent,
                resolve: {
                    doctor: DoctorResolver
                }
            },
            {
                path: ':id/edit',
                component: DoctorEditComponent,
                resolve: {
                    doctor: DoctorResolver
                }
            }
        ]),
        SharedModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule
    ],
    providers: [DoctorsResolver, DoctorResolver]
})
export class DoctorsModule {
}
