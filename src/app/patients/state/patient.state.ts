import {Action, createSelector, Selector, State, StateContext, Store} from "@ngxs/store";
import {PatientStateModel} from "./patient.state-model";
import {Injectable} from "@angular/core";
import {tap} from "rxjs";
import {PatientService} from "../services/patient.service";
import {
    AddDoctorToPatient,
    AddPatient,
    GetPatientById,
    GetPatients,
    GetPatientsByCaretakerId,
    GetPatientsByDoctorId,
    GetPatientsByHospitalId,
    UpdatePatient
} from "./patient.actions";
import {HospitalService} from "../../hospitals/hospital.service";
import {DoctorService} from "../../doctors/services/doctor.service";
import {PatientCaretakerService} from "../../patient-caretakers/services/patient-caretaker.service";

@State<PatientStateModel>({
    name: 'patients',
    defaults: {
        patients: []
    }
})

@Injectable()
export class PatientState {

    constructor(private store: Store, private patientService: PatientService, private hospitalService: HospitalService, private doctorService: DoctorService, private patientCaretakerService: PatientCaretakerService) {
    }

    @Selector()
    static selectPatients(state: PatientStateModel) {
        return state.patients;
    }

    @Selector()
    static selectPatientsByHospital(state: PatientStateModel) {
        return (hospitalId: string) => {
            return state.patients.filter(x => x.hospitalId == hospitalId);
        }
    }

    static selectPatientById(id: string) {
        return createSelector([PatientState], (state: PatientStateModel) => {
            return state.patients.filter(x => x.id == id)[0];
        });
    }

    static selectPatientsByHospitalId(hospitalId: string) {
        return createSelector([PatientState], (state: PatientStateModel) => {
            return state.patients.filter(x => x.hospitalId == hospitalId);
        });
    }

    static selectPatientsByDoctorId(doctorId: string) {
        return createSelector([PatientState], (state: PatientStateModel) => {
            return state.patients.filter(x => x.doctorId == doctorId);
        });
    }

    static selectPatientsByCaretakerId(caretakerId: string) {
        return createSelector([PatientState], (state: PatientStateModel) => {
            return state.patients.filter(x => x.patientCaretakerId == caretakerId);
        });
    }

    @Action(GetPatients)
    getDataFromState(ctx: StateContext<PatientStateModel>, {queryParams}: GetPatients) {

        return this.patientService.get(queryParams).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                patients: returnData
            });
        }))
    }

    @Action(GetPatientById)
    getPatientByIdFromState(ctx: StateContext<PatientStateModel>, {id}: GetPatientById) {
        return this.patientService.getById(id).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.patchState({
                patients: [...state.patients, returnData]
            })
        }));
    }

    @Action(GetPatientsByHospitalId)
    getPatientsByHospitalFromState(ctx: StateContext<PatientStateModel>, {hospitalId, queryParams}: GetPatientsByHospitalId) {
        return this.hospitalService.getPatients(hospitalId, queryParams).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                patients: returnData
            });
        }))
    }

    @Action(GetPatientsByDoctorId)
    getPatientsByDoctorFromState(ctx: StateContext<PatientStateModel>, {doctorId, queryParams}: GetPatientsByDoctorId) {
        return this.doctorService.getPatients(doctorId, queryParams).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                patients: returnData
            });
        }))
    }

    @Action(GetPatientsByCaretakerId)
    getPatientsByCaretakerFromState(ctx: StateContext<PatientStateModel>, {caretakerId, queryParams}: GetPatientsByCaretakerId) {
        return this.patientCaretakerService.getPatients(caretakerId, queryParams).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                patients: returnData
            });
        }))
    }

    @Action(AddPatient)
    addPatientIntoState(ctx: StateContext<PatientStateModel>, {payload}: AddPatient) {
        return this.patientService.create(payload).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.patchState({
                patients: [...state.patients, returnData]
            })
        }))
    }

    @Action(UpdatePatient)
    updateDataOfState(ctx: StateContext<PatientStateModel>, {id, payload}: UpdatePatient) {

        return this.patientService.update(id, payload).pipe(tap(returnData => {

            const state = ctx.getState();
            const patients = [...state.patients];
            const index = patients.findIndex(x => x.id == id);
            patients[index] = returnData;

            ctx.setState({
                ...state,
                patients: patients,
            });
        }))
    }

    @Action(AddDoctorToPatient)
    addDoctorToPatient(ctx: StateContext<PatientStateModel>, {id, payload}: AddDoctorToPatient) {

        return this.patientService.addDoctor(id, payload).pipe(tap(() => {

            const state = ctx.getState();
            const patients = [...state.patients];
            const index = patients.findIndex(x => x.id == id);
            patients[index].doctorId = payload['doctorId'];

            ctx.setState({
                ...state,
                patients: patients,
            });
        }))
    }
}
