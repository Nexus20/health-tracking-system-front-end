import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {AuthState} from "../../users/states/auth.state";
import {Logout} from "../../users/states/auth.action";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public isUserAuthenticated!: boolean;
    public isUserDoctor!: boolean;
    public isUserPatient!: boolean;
    public isUserPatientCaretaker!: boolean;
    public isUserHospitalAdministrator!: boolean;

    constructor(private store: Store, private router: Router) {
    }

    ngOnInit(): void {
        const token = this.store.selectSnapshot(AuthState.token);

        if (!token) {
            this.isUserAuthenticated = false;
            this.isUserDoctor = false;
            this.isUserPatient = false;
            this.isUserPatientCaretaker = false;
            this.isUserHospitalAdministrator = false;
            return;
        }

        this.isUserAuthenticated = true;
        this.isUserDoctor = this.store.selectSnapshot(AuthState.doctorId) != undefined;
        this.isUserPatient = this.store.selectSnapshot(AuthState.patientId) != undefined;
        this.isUserPatientCaretaker = this.store.selectSnapshot(AuthState.patientCaretakerId) != undefined;
        this.isUserHospitalAdministrator = this.store.selectSnapshot(AuthState.hospitalAdministratorId) != undefined;
    }

    logout() {
        this.store.dispatch(new Logout()).subscribe(() => {
            this.isUserAuthenticated = false;
            this.isUserDoctor = false;
            this.isUserPatient = false;
            this.isUserPatientCaretaker = false;
            this.isUserHospitalAdministrator = false;
            this.router.navigate(['/']);
        });
    }
}
