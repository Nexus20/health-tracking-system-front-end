import {Action, createSelector, Selector, State, StateContext, Store} from "@ngxs/store";
import {DoctorStateModel} from "./doctor.state-model";
import {Injectable} from "@angular/core";
import {tap} from "rxjs";
import {AddDoctor, GetDoctorById, GetDoctors, GetDoctorsByHospitalId, UpdateDoctor} from "./doctor.actions";
import {DoctorService} from "../services/doctor.service";
import {HospitalService} from "../../hospitals/hospital.service";

@State<DoctorStateModel>({
    name: 'doctors',
    defaults: {
        doctors: []
    }
})

@Injectable()
export class DoctorState {

    constructor(private store: Store, private doctorService: DoctorService, private hospitalService: HospitalService) {
    }

    @Selector()
    static selectDoctors(state: DoctorStateModel) {
        return state.doctors;
    }

    @Selector()
    static selectDoctorsByHospital(state: DoctorStateModel) {
        return (hospitalId: string) => {
            return state.doctors.filter(x => x.hospitalId == hospitalId);
        }
    }

    static selectDoctorById(id: string) {
        return createSelector([DoctorState], (state: DoctorStateModel) => {
            return state.doctors.filter(x => x.id == id)[0];
        });
    }

    static selectDoctorsByHospitalId(hospitalId: string) {
        return createSelector([DoctorState], (state: DoctorStateModel) => {
            return state.doctors.filter(x => x.hospitalId == hospitalId);
        });
    }

    @Action(GetDoctors)
    getDataFromState(ctx: StateContext<DoctorStateModel>, {queryParams}: GetDoctors) {

        return this.doctorService.get(queryParams).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                doctors: returnData
            });
        }))
    }

    @Action(GetDoctorById)
    getDoctorByIdFromState(ctx: StateContext<DoctorStateModel>, {id}: GetDoctorById) {
        return this.doctorService.getById(id).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.patchState({
                doctors: [...state.doctors, returnData]
            })
        }));
    }

    @Action(GetDoctorsByHospitalId)
    getDoctorsByHospitalFromState(ctx: StateContext<DoctorStateModel>, {hospitalId, queryParams}: GetDoctorsByHospitalId) {
        return this.hospitalService.getDoctors(hospitalId, queryParams).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                doctors: returnData
            });
        }))
    }

    @Action(AddDoctor)
    addDoctorIntoState(ctx: StateContext<DoctorStateModel>, {payload}: AddDoctor) {
        return this.doctorService.create(payload).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.patchState({
                doctors: [...state.doctors, returnData]
            })
        }))
    }

    @Action(UpdateDoctor)
    updateDataOfState(ctx: StateContext<DoctorStateModel>, {id, payload}: UpdateDoctor) {

        return this.doctorService.update(id, payload).pipe(tap(returnData => {

            const state = ctx.getState();
            const doctors = [...state.doctors];
            const index = doctors.findIndex(x => x.id == id);
            doctors[index] = returnData;

            ctx.setState({
                ...state,
                doctors: doctors,
            });
        }))
    }
}
