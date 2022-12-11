import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {IDoctorResult} from "../../hospitals/models/IDoctorResult";
import {Store} from "@ngxs/store";
import {map, Observable} from "rxjs";
import {GetDoctorById} from "../state/doctor.actions";
import {DoctorState} from "../state/doctor.state";

@Injectable()
export class DoctorResolver implements Resolve<IDoctorResult> {

    constructor(private store: Store) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDoctorResult> | Promise<IDoctorResult> | IDoctorResult {
        const doctorId = route.paramMap.get('id')!;
        return this.store.dispatch(new GetDoctorById(doctorId)).pipe(
            map(() => this.store.selectSnapshot(DoctorState.selectDoctorById(doctorId)))
        )
    }
}
