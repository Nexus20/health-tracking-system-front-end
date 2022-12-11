import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {IDoctorResult} from "../../hospitals/models/IDoctorResult";
import {map, Observable} from "rxjs";
import {Store} from "@ngxs/store";
import {GetDoctors} from "../state/doctor.actions";
import {DoctorState} from "../state/doctor.state";

@Injectable()
export class DoctorsResolver implements Resolve<IDoctorResult[]> {

    constructor(private store: Store) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDoctorResult[]> | Promise<IDoctorResult[]> | IDoctorResult[] {

        return this.store.dispatch(new GetDoctors()).pipe(
            map(() => this.store.selectSnapshot(DoctorState.selectDoctors))
        )
    }
}

