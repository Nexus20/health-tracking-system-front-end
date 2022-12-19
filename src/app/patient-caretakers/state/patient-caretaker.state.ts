import {Injectable} from "@angular/core";
import {Action, createSelector, Selector, State, StateContext, Store} from "@ngxs/store";
import {PatientCaretakerStateModel} from "./patient-caretaker.state-model";
import {PatientService} from "../../patients/services/patient.service";
import {PatientCaretakerService} from "../services/patient-caretaker.service";
import {tap} from "rxjs";
import {
    AddCaretakerToPatient,
    GetPatientCaretakerById,
    GetPatientCaretakerByPatientId,
    GetPatientCaretakers
} from "./patient-caretaker.actions";

@State<PatientCaretakerStateModel>({
    name: 'patientCaretakers',
    defaults: {
        caretakers: []
    }
})

@Injectable()
export class PatientCaretakerState {

    constructor(private store: Store, private patientCaretakerService: PatientCaretakerService, private patientService: PatientService) {
    }

    @Selector()
    static selectPatientCaretakers(state: PatientCaretakerStateModel) {
        return state.caretakers;
    }

    static selectPatientCaretakerById(id: string) {
        return createSelector([PatientCaretakerState], (state: PatientCaretakerStateModel) => {
            return state.caretakers.filter(x => x.id == id)[0];
        });
    }

    @Action(GetPatientCaretakers)
    getDataFromState(ctx: StateContext<PatientCaretakerStateModel>, {queryParams}: GetPatientCaretakers) {

        return this.patientCaretakerService.get(queryParams).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                caretakers: returnData
            });
        }))
    }

    @Action(GetPatientCaretakerById)
    getPatientCaretakerByIdFromState(ctx: StateContext<PatientCaretakerStateModel>, {id}: GetPatientCaretakerById) {
        return this.patientCaretakerService.getById(id).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.patchState({
                caretakers: [...state.caretakers, returnData]
            })
        }));
    }

    @Action(GetPatientCaretakerByPatientId)
    getPatientCaretakerByPatientId(ctx: StateContext<PatientCaretakerStateModel>, {patientId}: GetPatientCaretakerByPatientId) {
        return this.patientService.getCaretaker(patientId).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.patchState({
                caretakers: [...state.caretakers, returnData]
            })
        }));
    }

    @Action(AddCaretakerToPatient)
    addPatientCaretakerIntoState(ctx: StateContext<PatientCaretakerStateModel>, {payload}: AddCaretakerToPatient) {
        return this.patientCaretakerService.create(payload).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.patchState({
                caretakers: [...state.caretakers, returnData]
            })
        }))
    }

    // @Action(UpdatePatientCaretaker)
    // updateDataOfState(ctx: StateContext<PatientCaretakerStateModel>, {id, payload}: UpdatePatientCaretaker) {
    //
    //     return this.patientService.update(id, payload).pipe(tap(returnData => {
    //
    //         const state = ctx.getState();
    //         const patients = [...state.patients];
    //         const index = patients.findIndex(x => x.id == id);
    //         patients[index] = returnData;
    //
    //         ctx.setState({
    //             ...state,
    //             patients: patients,
    //         });
    //     }))
    // }
}
