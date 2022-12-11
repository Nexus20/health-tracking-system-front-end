import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";
import {HospitalsResolver} from "./hospitals/resolvers/hospitals.resolver";

const routes: Routes = [
    {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
    },
    {
        path: 'hospitals',
        loadChildren: () => import('./hospitals/hospitals.module').then(m => m.HospitalsModule),
        canActivate: [AuthGuard],
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
