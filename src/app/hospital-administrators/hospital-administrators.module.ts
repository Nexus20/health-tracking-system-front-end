import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HospitalAdministratorViewComponent} from './hospital-administrator-view/hospital-administrator-view.component';
import {RouterModule} from "@angular/router";
import {HospitalAdministratorResolver} from "./resolvers/hospital-administrator.resolver";
import {SharedModule} from "../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";


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
        TranslateModule,
    ],
    providers: [HospitalAdministratorResolver]
})
export class HospitalAdministratorsModule {
}
