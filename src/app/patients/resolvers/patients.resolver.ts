import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngxs/store";
import {map, Observable} from "rxjs";
import {IPatientResult} from "../../hospitals/models/IPatientResult";
import {GetPatients, GetPatientsByDoctorId, GetPatientsByHospitalId} from "../state/patient.actions";
import {PatientState} from "../state/patient.state";
import {Injectable} from "@angular/core";
import {ProfileState} from "../../profile/state/profile.state";
import {AuthState} from "../../users/states/auth.state";

@Injectable()
export class PatientsResolver implements Resolve<IPatientResult[]> {

    constructor(private store: Store) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPatientResult[]> | Promise<IPatientResult[]> | IPatientResult[] {

        const hospitalId = this.store.selectSnapshot(ProfileState.selectAdministratorHospitalId);

        if(hospitalId !== undefined) {
            return this.store.dispatch(new GetPatientsByHospitalId(hospitalId)).pipe(
                map(() => this.store.selectSnapshot(PatientState.selectPatientsByHospitalId(hospitalId)))
            );
        }

        const doctorId = this.store.selectSnapshot(AuthState.doctorId);

        if(doctorId !== undefined) {
            return this.store.dispatch(new GetPatientsByDoctorId(doctorId)).pipe(
                map(() => this.store.selectSnapshot(PatientState.selectPatientsByDoctorId(doctorId)))
            );
        }

        return this.store.dispatch(new GetPatients()).pipe(
            map(() => this.store.selectSnapshot(PatientState.selectPatients))
        )
    }
}
