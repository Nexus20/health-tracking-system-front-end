import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    HeaderComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        TranslateModule
    ],
    exports: [
        HeaderComponent,
    ]
})
export class SharedModule { }
