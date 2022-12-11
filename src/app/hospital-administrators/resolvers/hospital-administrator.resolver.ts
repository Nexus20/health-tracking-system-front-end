import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {IHospitalAdministratorResult} from "../../hospitals/models/IHospitalAdministratorResult";
import {map, Observable} from "rxjs";
import {GetHospitalAdministratorById} from "../states/hospital-administrator.actions";
import {HospitalAdministratorState} from "../states/hospital-administrator.state";
import {Store} from "@ngxs/store";
import {Injectable} from "@angular/core";

@Injectable()
export class HospitalAdministratorResolver implements Resolve<IHospitalAdministratorResult> {

    constructor(private store: Store) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHospitalAdministratorResult> | Promise<IHospitalAdministratorResult> | IHospitalAdministratorResult {

        const hospitalAdministratorId = route.paramMap.get('id')!;

        //return this.store.selectSnapshot(HospitalAdministratorState.selectHospitalAdministratorsByIdDynamic(hospitalAdministratorId!));

        // return this.store.select(HospitalAdministratorState.selectHospitalAdministratorsById)
        //     .pipe(map(filter => filter(hospitalAdministratorId!)));

        return this.store.dispatch(new GetHospitalAdministratorById(hospitalAdministratorId)).pipe(
            map(() => this.store.selectSnapshot(HospitalAdministratorState.selectHospitalAdministratorsByIdDynamic(hospitalAdministratorId)))
        )
    }
}
