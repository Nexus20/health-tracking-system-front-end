import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { HospitalCreateComponent } from './hospital-create/hospital-create.component';
import { HospitalViewComponent } from './hospital-view/hospital-view.component';



@NgModule({
  declarations: [
    HospitalsComponent,
    HospitalCreateComponent,
    HospitalViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HospitalsModule { }
