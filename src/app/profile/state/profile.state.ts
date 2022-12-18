import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {ProfileStateModel} from "./profile.state-model";
import {Injectable} from "@angular/core";
import {UserService} from "../../users/user.service";
import {ClearProfile, GetOwnProfile} from "./profile.actions";
import {tap} from "rxjs";

@State<ProfileStateModel>({
    name: 'profile',
    defaults: {
        profile: undefined
    }
})

@Injectable()
export class ProfileState {

    constructor(private store: Store, private userService: UserService) {
    }

    @Selector()
    static selectProfile(state: ProfileStateModel) {
        return state.profile;
    }

    @Selector()
    static selectAdministratorHospitalId(state: ProfileStateModel) {
        return state.profile?.hospitalAdministrator?.hospitalId;
    }

    @Selector()
    static selectDoctorHospitalId(state: ProfileStateModel) {
        return state.profile?.doctor?.hospitalId;
    }

    @Selector()
    static selectPatientDoctorId(state: ProfileStateModel) {
        return state.profile?.patient?.doctorId;
    }

    @Selector()
    static selectPatientHospitalId(state: ProfileStateModel) {
        return state.profile?.patient?.hospitalId;
    }

    @Action(GetOwnProfile)
    getOwnProfile(ctx: StateContext<ProfileStateModel>, {}: GetOwnProfile) {
        return this.userService.getOwnProfile().pipe(tap(returnData => {
            const state = ctx.getState();
            state.profile = returnData;
            ctx.setState(state);
        }));
    }

    @Action(ClearProfile)
    clearProfile(ctx: StateContext<ProfileStateModel>, {}: ClearProfile) {
        const state = ctx.getState();
        state.profile = undefined;
        ctx.setState(state);
    }
}
