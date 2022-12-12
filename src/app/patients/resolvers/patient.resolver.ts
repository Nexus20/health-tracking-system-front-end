import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngxs/store";
import {map, Observable} from "rxjs";
import {IPatientResult} from "../../hospitals/models/IPatientResult";
import {GetPatientById} from "../state/patient.actions";
import {PatientState} from "../state/patient.state";
import {Injectable} from "@angular/core";

@Injectable()
export class PatientResolver implements Resolve<IPatientResult> {

    constructor(private store: Store) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPatientResult> | Promise<IPatientResult> | IPatientResult {
        const patientId = route.paramMap.get('id')!;
        return this.store.dispatch(new GetPatientById(patientId)).pipe(
            map(() => this.store.selectSnapshot(PatientState.selectPatientById(patientId)))
        )
    }
}
