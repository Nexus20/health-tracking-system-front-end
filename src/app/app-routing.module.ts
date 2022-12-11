import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
    {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
    },
    {
        path: 'hospitals',
        loadChildren: () => import('./hospitals/hospitals.module').then(m => m.HospitalsModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'hospital-administrators',
        loadChildren: () => import('./hospital-administrators/hospital-administrators.module').then(m => m.HospitalAdministratorsModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'doctors',
        loadChildren: () => import('./doctors/doctors.module').then(m => m.DoctorsModule),
        canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
