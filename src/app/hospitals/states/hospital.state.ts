import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {HospitalStateModel} from "./hospital.model";
import {Injectable} from "@angular/core";
import {HospitalService} from "../hospital.service";
import {AddHospital, GetHospitals, UpdateHospital} from "./hospital.actions";
import {tap} from "rxjs";

@State<HospitalStateModel>({
    name: 'hospitals',
    defaults: {
        hospitals: []
    }
})

@Injectable()
export class HospitalState {

    constructor(private store: Store, private hospitalService: HospitalService) {
    }

    @Selector()
    static selectHospitalsFromState(state: HospitalStateModel) {
        return state.hospitals;
    }

    @Selector()
    static selectHospitalById(state: HospitalStateModel) {
        return (shopId: string) => {
            return state.hospitals.filter(x => x.id == shopId)[0];
        }
    }

    @Action(GetHospitals)
    getDataFromState(ctx: StateContext<HospitalStateModel>, {queryParams}: GetHospitals) {

        return this.hospitalService.get(queryParams).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                hospitals: returnData
            });
        }))
    }

    @Action(AddHospital)
    addHospitalIntoState(ctx: StateContext<HospitalStateModel>, {payload}: AddHospital) {
        return this.hospitalService.create(payload).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.patchState({
                hospitals: [...state.hospitals, returnData]
            })
        }))
    }

    @Action(UpdateHospital)
    updateDataOfState(ctx: StateContext<HospitalStateModel>, {id, payload}: UpdateHospital) {

        console.log("Update", id);

        return this.hospitalService.update(id, payload).pipe(tap(returnData => {

            const state = ctx.getState();
            const hospitals = [...state.hospitals];
            const index = hospitals.findIndex(x => x.id == id);
            hospitals[index] = returnData;
            console.log("All hospitals after update", hospitals);

            ctx.setState({
                ...state,
                hospitals: hospitals,
            });
        }))
    }
}
