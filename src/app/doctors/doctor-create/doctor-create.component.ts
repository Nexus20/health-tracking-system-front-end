import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {ProfileState} from "../../profile/state/profile.state";
import {AddDoctor} from "../state/doctor.actions";

@Component({
  selector: 'app-doctor-create',
  templateUrl: './doctor-create.component.html',
  styleUrls: ['./doctor-create.component.scss']
})
export class DoctorCreateComponent implements OnInit {

    addDoctorForm!: FormGroup;
    private hospitalId!: string;

    constructor(private store: Store, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.hospitalId = this.store.selectSnapshot(ProfileState.selectAdministratorHospitalId)!;
        console.log(this.hospitalId);
        this.initForm();
    }

    submitForm() {
        if(!this.addDoctorForm.valid)
            return;

        console.log(this.addDoctorForm.value);

        this.store.dispatch(new AddDoctor(this.addDoctorForm.value))
            .subscribe(() => {
                this.addDoctorForm.reset();
                this.router.navigate([`/doctors`]);
            })
    }

    initForm(): void {
        this.addDoctorForm = this.formBuilder.group({
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
