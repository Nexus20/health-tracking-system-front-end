import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {AuthState} from "../../users/states/auth.state";
import {Logout, SetLanguage} from "../../users/states/auth.action";
import {ClearProfile} from "../../profile/state/profile.actions";
import {TranslateService} from "@ngx-translate/core";

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
    public isUserRoot!: boolean;
    public languages: string[] = [];
    public selectedLanguage!: string;

    constructor(private store: Store, private router: Router, private translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.getAvailableLanguages();
        this.selectedLanguage = this.store.selectSnapshot(AuthState.selectLanguage);
        const token = this.store.selectSnapshot(AuthState.token);

        if (!token) {
            this.isUserAuthenticated = false;
            this.isUserDoctor = false;
            this.isUserPatient = false;
            this.isUserPatientCaretaker = false;
            this.isUserHospitalAdministrator = false;
            this.isUserRoot = false;
            return;
        }

        this.isUserAuthenticated = true;
        this.isUserDoctor = this.store.selectSnapshot(AuthState.doctorId) != undefined;
        this.isUserPatient = this.store.selectSnapshot(AuthState.patientId) != undefined;
        this.isUserPatientCaretaker = this.store.selectSnapshot(AuthState.patientCaretakerId) != undefined;
        this.isUserHospitalAdministrator = this.store.selectSnapshot(AuthState.hospitalAdministratorId) != undefined;
        this.isUserRoot = this.store.selectSnapshot(AuthState.isRoot);
    }

    logout() {
        this.store.dispatch([new Logout(), new ClearProfile()]).subscribe(() => {
            this.isUserAuthenticated = false;
            this.isUserDoctor = false;
            this.isUserPatient = false;
            this.isUserPatientCaretaker = false;
            this.isUserHospitalAdministrator = false;
            this.isUserRoot = false;
            this.router.navigate(['/']);
        });
    }

    setLanguage() {
        this.translateService.use(this.selectedLanguage);
        this.store.dispatch(new SetLanguage(this.selectedLanguage));
    }

    getAvailableLanguages() {
        this.languages = [...this.translateService.getLangs()];
    }
}
