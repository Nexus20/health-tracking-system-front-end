import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IHospitalAdministratorResult} from "../../hospitals/models/IHospitalAdministratorResult";
import {UpdateHospitalAdministrator} from "../states/hospital-administrator.actions";

@Component({
  selector: 'app-hospital-administrator-edit',
  templateUrl: './hospital-administrator-edit.component.html',
  styleUrls: ['./hospital-administrator-edit.component.scss']
})
export class HospitalAdministratorEditComponent implements OnInit {

    hospitalAdministrator!: IHospitalAdministratorResult;
    editHospitalAdministratorForm!: FormGroup;

    constructor(private store: Store, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({administrator}) => {
            this.hospitalAdministrator = administrator;
            console.log(this.hospitalAdministrator);
            this.initForm();
        })
    }

    private initForm() {
        this.editHospitalAdministratorForm = this.formBuilder.group({
            firstname: new FormControl(this.hospitalAdministrator.firstName, Validators.required),
            lastname: new FormControl(this.hospitalAdministrator.lastName, Validators.required),
            patronymic: new FormControl(this.hospitalAdministrator.patronymic, Validators.required),
            phone: new FormControl(this.hospitalAdministrator.phone, Validators.required),
            email: new FormControl(this.hospitalAdministrator.email, [Validators.required, Validators.email]),
            birthDate: new FormControl(this.hospitalAdministrator.birthDate, Validators.required),
            hospitalId: new FormControl(this.hospitalAdministrator.hospitalId, Validators.required)
        });
    }

    submitForm() {
        if (!this.editHospitalAdministratorForm.valid)
            return;

        console.log(this.editHospitalAdministratorForm.value);

        this.store.dispatch(new UpdateHospitalAdministrator(this.hospitalAdministrator.id, this.editHospitalAdministratorForm.value))
            .subscribe(() => {
                console.log("hospital admin updated");
                this.router.navigate(['/hospital-administrators/' + this.hospitalAdministrator.id]);
            });
    }
}
