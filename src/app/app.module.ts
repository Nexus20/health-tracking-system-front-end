import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MissingTranslationService} from "./core/utils/MissingTranslationService";
import {NgxsModule} from "@ngxs/store";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {AuthState} from "./users/states/auth.state";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {JwtModule} from "@auth0/angular-jwt";
import {InterceptorsModule} from "./core/interceptors/interceptors.module";
import {HospitalState} from "./hospitals/states/hospital.state";
import {UserService} from "./users/user.service";
import {HospitalService} from "./hospitals/hospital.service";
import {HospitalsResolver} from "./hospitals/resolvers/hospitals.resolver";
import {HospitalAdministratorState} from "./hospital-administrators/states/hospital-administrator.state";
import {MatNativeDateModule} from "@angular/material/core";

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
    return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

export function tokenGetter() {
    return localStorage.getItem("token");
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            useDefaultLang: false,
            defaultLanguage: 'en',
            missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MissingTranslationService},
        }),
        NgxsModule.forRoot([AuthState, HospitalState, HospitalAdministratorState]),
        NgxsStoragePluginModule.forRoot({
            key: ['auth'],
        }),
        NgxsLoggerPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ["localhost:7088"],
            }
        }),
        InterceptorsModule,
        MatNativeDateModule
    ],
    providers: [HospitalsResolver, UserService, HospitalService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
