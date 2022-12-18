import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HospitalAdministratorViewComponent} from './hospital-administrator-view/hospital-administrator-view.component';
import {RouterModule} from "@angular/router";
import {HospitalAdministratorResolver} from "./resolvers/hospital-administrator.resolver";
import {SharedModule} from "../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {HospitalAdministratorEditComponent} from './hospital-administrator-edit/hospital-administrator-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";


@NgModule({
    declarations: [
        HospitalAdministratorViewComponent,
        HospitalAdministratorEditComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: ':id',
                component: HospitalAdministratorViewComponent,
                resolve: {
                    administrator: HospitalAdministratorResolver
                },
            },
            {
                path: ':id/edit',
                component: HospitalAdministratorEditComponent,
                resolve: {
                    administrator: HospitalAdministratorResolver
                },
            }
        ]),
        SharedModule,
        TranslateModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
    ],
    providers: [HospitalAdministratorResolver]
})
export class HospitalAdministratorsModule {
}
