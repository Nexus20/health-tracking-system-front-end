import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngxs/store";
import {map, Observable} from "rxjs";
import {IHospitalAdministratorResult} from "../models/IHospitalAdministratorResult";
import {GetHospitalAdministrators} from "../../hospital-administrators/states/hospital-administrator.actions";
import {HospitalAdministratorState} from "../../hospital-administrators/states/hospital-administrator.state";

@Injectable()
export class HospitalAdministratorsResolver implements Resolve<IHospitalAdministratorResult[]> {

    constructor(private store: Store) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHospitalAdministratorResult[]> | Promise<IHospitalAdministratorResult[]> | IHospitalAdministratorResult[] {

        const hospitalId = route.paramMap.get('id')!;

        return this.store.dispatch(new GetHospitalAdministrators(hospitalId)).pipe(
            map(() => this.store.selectSnapshot(HospitalAdministratorState.selectHospitalAdministrators))
        )
    }
}
