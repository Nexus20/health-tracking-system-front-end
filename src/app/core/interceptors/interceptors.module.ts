import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./token.interceptor";
import {ErrorInterceptor} from "./error.interceptor";


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ]
})
export class InterceptorsModule {
}
