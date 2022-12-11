import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {AddHospitalAdministrator} from "../../hospital-administrators/states/hospital-administrator.actions";

@Component({
    selector: 'app-hospital-create-administrator',
    templateUrl: './hospital-create-administrator.component.html',
    styleUrls: ['./hospital-create-administrator.component.scss']
})
export class HospitalCreateAdministratorComponent implements OnInit {

    addHospitalAdministratorForm!: FormGroup;
    private hospitalId!: string;

    constructor(private store: Store, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.hospitalId = params['id'];
            this.initForm();
        });
    }

    submitForm() {
        if(!this.addHospitalAdministratorForm.valid)
            return;

        console.log(this.addHospitalAdministratorForm.value);

        this.store.dispatch(new AddHospitalAdministrator(this.addHospitalAdministratorForm.value))
            .subscribe(() => {
                this.addHospitalAdministratorForm.reset();
                this.router.navigate([`/hospitals/${this.hospitalId}/administrators`]);
            })
    }

    initForm(): void {
        this.addHospitalAdministratorForm = this.formBuilder.group({
            firstname: new FormControl("", Validators.required),
            lastname: new FormControl("", Validators.required),
            patronymic: new FormControl("", Validators.required),
            phone: new FormControl("", Validators.required),
            email: new FormControl("", [Validators.required, Validators.email]),
            birthDate: new FormControl(""),
            password: new FormControl("", Validators.required),
            hospitalId: new FormControl(this.hospitalId, Validators.required)
        });
    }
}
