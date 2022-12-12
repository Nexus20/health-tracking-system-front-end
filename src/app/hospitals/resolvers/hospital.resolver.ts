import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {IHospitalResult} from "../models/hospital.result";
import {Store} from "@ngxs/store";
import {map, Observable} from "rxjs";
import {HospitalState} from "../states/hospital.state";
import {GetHospitalById} from "../states/hospital.actions";

@Injectable()
export class HospitalResolver implements Resolve<IHospitalResult> {

    constructor(private store: Store) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHospitalResult> | Promise<IHospitalResult> | IHospitalResult {
        const hospitalId = route.paramMap.get('id')!;
        return this.store.dispatch(new GetHospitalById(hospitalId)).pipe(
            map(() => this.store.selectSnapshot(HospitalState.selectHospitalById(hospitalId)))
        )
    }
}
