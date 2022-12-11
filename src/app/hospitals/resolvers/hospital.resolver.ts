// import {Injectable} from "@angular/core";
// import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
// import {IHospitalResult} from "../models/hospital.result";
// import {Store} from "@ngxs/store";
// import {map, Observable} from "rxjs";
// import {HospitalState} from "../states/hospital.state";
//
// @Injectable()
// export class HospitalResolver implements Resolve<IHospitalResult> {
//
//     constructor(private store: Store) {
//     }
//
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHospitalResult> | Promise<IHospitalResult> | IHospitalResult {
//         stat
//         return this.store.select(HospitalState.selectHospitalById)
//             .pipe(map(filter => filter(this.orderId)))
//     }
// }
