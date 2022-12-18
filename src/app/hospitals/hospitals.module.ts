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
import {HospitalEditComponent} from './hospital-edit/hospital-edit.component';
import {
    HospitalViewAdministratorsComponent
} from './hospital-view-administrators/hospital-view-administrators.component';
import {HospitalAdministratorsResolver} from "./resolvers/hospital-administrators.resolver";
import {
    HospitalCreateAdministratorComponent
} from './hospital-create-administrator/hospital-create-administrator.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {HospitalResolver} from "./resolvers/hospital.resolver";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
    declarations: [
        HospitalsComponent,
        HospitalCreateComponent,
        HospitalViewComponent,
        HospitalEditComponent,
        HospitalViewAdministratorsComponent,
        HospitalCreateAdministratorComponent
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
            {
                path: ':id',
                component: HospitalViewComponent,
                resolve: {
                    hospital: HospitalResolver
                }
            },
            {
                path: ':id/edit',
                component: HospitalEditComponent,
                resolve: {
                    hospital: HospitalResolver
                }
            },
            {
                path: ':id/administrators',
                component: HospitalViewAdministratorsComponent,
                resolve: {
                    administrators: HospitalAdministratorsResolver
                }
            },
            {
                path: ':id/administrators/add-new',
                component: HospitalCreateAdministratorComponent
            },
        ]),
        SharedModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        TranslateModule,
    ],
    providers: [HospitalsResolver, HospitalResolver, HospitalAdministratorsResolver]
})
export class HospitalsModule {
}
