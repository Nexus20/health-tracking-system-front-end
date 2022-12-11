import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DoctorsComponent} from './doctors/doctors.component';
import {DoctorViewComponent} from './doctor-view/doctor-view.component';
import {DoctorCreateComponent} from './doctor-create/doctor-create.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        DoctorsComponent,
        DoctorViewComponent,
        DoctorCreateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: DoctorsComponent,
            },
            {
                path: 'create',
                component: DoctorCreateComponent,
            },
            {
                path: ':id',
                component: DoctorViewComponent,
            }
        ]),
        SharedModule
    ]
})
export class DoctorsModule {
}
