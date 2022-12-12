import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngxs/store";
import {map, Observable} from "rxjs";
import {IPatientResult} from "../../hospitals/models/IPatientResult";
import {GetPatients} from "../state/patient.actions";
import {PatientState} from "../state/patient.state";
import {Injectable} from "@angular/core";

@Injectable()
export class PatientsResolver implements Resolve<IPatientResult[]> {

    constructor(private store: Store) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPatientResult[]> | Promise<IPatientResult[]> | IPatientResult[] {

        return this.store.dispatch(new GetPatients()).pipe(
            map(() => this.store.selectSnapshot(PatientState.selectPatients))
        )
    }
}
