import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HospitalsComponent} from './hospitals/hospitals.component';
import {HospitalCreateComponent} from './hospital-create/hospital-create.component';
import {HospitalViewComponent} from './hospital-view/hospital-view.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {HospitalsResolver} from "./resolvers/hospitals.resolver";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


@NgModule({
    declarations: [
        HospitalsComponent,
        HospitalCreateComponent,
        HospitalViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: HospitalsComponent,
                resolve: {
                    hospitals: HospitalsResolver
                }
            },
            {path: 'create', component: HospitalCreateComponent},
            {path: ':id', component: HospitalViewComponent},
        ]),
        SharedModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    providers: [HospitalsResolver]
})
export class HospitalsModule {
}
