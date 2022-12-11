import {HospitalAdministratorStateModel} from "./hospital-administrator.state-model";
import {Action, createSelector, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {HospitalService} from "../../hospitals/hospital.service";
import {
    AddHospitalAdministrator,
    GetHospitalAdministratorById,
    GetHospitalAdministrators
} from "./hospital-administrator.actions";
import {tap} from "rxjs";
import {HospitalAdministratorService} from "../hospital-administrator.service";

@State<HospitalAdministratorStateModel>({
    name: 'hospitalAdministrators',
    defaults: {
        administrators: []
    }
})

@Injectable()
export class HospitalAdministratorState {

    constructor(private store: Store, private hospitalService: HospitalService, private hospitalAdministratorService : HospitalAdministratorService) {
    }

    @Selector()
    static selectHospitalAdministrators(state: HospitalAdministratorStateModel) {
        return state.administrators;
    }

    @Selector()
    static selectHospitalAdministratorsByHospital(state: HospitalAdministratorStateModel) {
        return (hospitalId: string) => {
            return state.administrators.filter(x => x.hospitalId == hospitalId);
        }
    }

    @Selector()
    static selectHospitalAdministratorsById(state: HospitalAdministratorStateModel) {
        return (id: string) => {
            return state.administrators.filter(x => x.id == id)[0];
        }
    }

    static selectHospitalAdministratorsByIdDynamic(id: string) {
        return createSelector([HospitalAdministratorState], (state: HospitalAdministratorStateModel) => {
            return state.administrators.filter(x => x.id == id)[0];
        });
    }

    @Action(GetHospitalAdministrators)
    getShopProductsFromState(ctx: StateContext<HospitalAdministratorStateModel>, {hospitalId, queryParams}: GetHospitalAdministrators) {
        return this.hospitalService.getAdministrators(hospitalId, queryParams).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                administrators: returnData
            });
        }))
    }

    @Action(GetHospitalAdministratorById)
    getOrderByIdFromState(ctx: StateContext<HospitalAdministratorStateModel>, {id}: GetHospitalAdministratorById) {
        return this.hospitalAdministratorService.getById(id).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.patchState({
                administrators: [...state.administrators, returnData]
            })
        }));
    }

    @Action(AddHospitalAdministrator)
    addHospitalAdministratorIntoState(ctx: StateContext<HospitalAdministratorStateModel>, {payload}: AddHospitalAdministrator) {
        return this.hospitalAdministratorService.create(payload).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.patchState({
                administrators: [...state.administrators, returnData]
            })
        }))
    }
}
