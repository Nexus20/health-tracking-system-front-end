import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from "rxjs";
import {IAuthState} from "./auth.model";
import {Login, Logout} from "./auth.action";
import {UserService} from "../user.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@State<IAuthState>({
    name: 'auth',
    defaults: {
        token: '',
        email: '',
        doctorId: undefined,
        patientCaretakerId: undefined,
        hospitalAdministratorId: undefined,
        patientId: undefined
    }
})
@Injectable()
export class AuthState {

    constructor(private authService: UserService, private jwtHelper: JwtHelperService) {
    }

    @Selector()
    static doctorId(state: IAuthState) {
        return state.doctorId;
    }

    @Selector()
    static patientId(state: IAuthState) {
        return state.patientId;
    }

    @Selector()
    static patientCaretakerId(state: IAuthState) {
        return state.patientCaretakerId;
    }

    @Selector()
    static hospitalAdministratorId(state: IAuthState) {
        return state.hospitalAdministratorId;
    }

    @Selector()
    static token(state: IAuthState) {
        return state.token;
    }

    @Action(Login)
    login({patchState}: StateContext<IAuthState>, {payload}: Login) {
        return this.authService.login(payload.email, payload.password)
            .pipe(tap(({token}) => {

                const decodedToken = this.decodeToken(token);

                patchState({
                    email: payload.email,
                    token,
                    doctorId: decodedToken["DoctorId"],
                    patientCaretakerId: decodedToken["PatientCaretakerId"],
                    hospitalAdministratorId: decodedToken["HospitalAdministratorId"],
                    patientId: decodedToken["PatientId"],
                })
            }));
    }

    @Action(Logout)
    logout({patchState}: StateContext<IAuthState>, {}: Logout) {
        patchState({
            email: "",
            token: "",
            doctorId: undefined,
            patientCaretakerId: undefined,
            hospitalAdministratorId: undefined,
            patientId: undefined
        })
    }

    private decodeToken(token: string): any {
        return this.jwtHelper.decodeToken(token);
    }
}
