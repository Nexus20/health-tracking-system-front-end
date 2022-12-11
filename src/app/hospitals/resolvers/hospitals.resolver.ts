import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {IHospitalResult} from "../models/hospital.result";
import {map, Observable} from "rxjs";
import {Store} from "@ngxs/store";
import {GetHospitals} from "../states/hospital.actions";
import {HospitalState} from "../states/hospital.state";

@Injectable()
export class HospitalsResolver implements Resolve<IHospitalResult[]> {

    constructor(private store: Store) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHospitalResult[]> | Promise<IHospitalResult[]> | IHospitalResult[] {
        return this.store.dispatch(new GetHospitals()).pipe(
            map(() => this.store.selectSnapshot(HospitalState.selectHospitalsFromState))
        )
    }
}
