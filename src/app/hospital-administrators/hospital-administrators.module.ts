import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HospitalAdministratorViewComponent} from './hospital-administrator-view/hospital-administrator-view.component';
import {RouterModule} from "@angular/router";
import {HospitalAdministratorResolver} from "./resolvers/hospital-administrator.resolver";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        HospitalAdministratorViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: ':id',
                component: HospitalAdministratorViewComponent,
                resolve: {
                    administrator: HospitalAdministratorResolver
                }
            }
        ]),
        SharedModule,
    ],
    providers: [HospitalAdministratorResolver]
})
export class HospitalAdministratorsModule {
}
